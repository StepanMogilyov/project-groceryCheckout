import React, { Component } from "react";
import Scanner from "./Scanner";
import getProduct from "../../helpers/getProduct";
import { getProductAC } from "../../store/product/actionCreators";
import { connect } from "react-redux";
import soundOfScan from "./soundOfScan.mp3";
import soundOfError from "./soundOfError.mp3";
import Skeleton from "@mui/material/Skeleton";

class BarcodeScanner extends Component {
  state = {
    isCameraReady: false,
  };

  scanResult = [];
  selectedProductsIDs = [];
  startTimer = false;

  componentDidUpdate() {
    this.scanResult = [];
    this.selectedProductsIDs = [];
    this.startTimer = false;
  }

  showAlert(text) {
    setTimeout(() => {
      alert(text);
    }, 100);
  }

  putProductToAC(arg) {
    const { getProductAC } = this.props;
    getProductAC(arg);
  }

  isReady = () => {
    this.setState({ isCameraReady: true });
  };

  _onDetected = async (result) => {
    if (this.scanResult.length < 2) {
      this.scanResult.push(result);
    }
    if (this.scanResult.length === 1) {
      this.currentCode = this.scanResult[0].codeResult.code;
      const product = await getProduct(this.currentCode);
      if (product) {
        if (!this.selectedProductsIDs.includes(product.id)) {
          new Audio(soundOfScan).play();
          this.selectedProductsIDs.push(product.id);
          this.putProductToAC(product);
          this.startTimer = true;
        } else {
          new Audio(soundOfError).play();
          this.startTimer = true;
          this.showAlert("Товар уже выбран");
        }
      } else {
        new Audio(soundOfError).play();
        this.showAlert("Товар не найден");
        this.startTimer = true;
      }
      if (this.startTimer) {
        this.startTimer = false;
        setTimeout(() => {
          this.scanResult = [];
        }, 2000);
      }
    }
  };

  render() {
    return (
      <>
        {!this.state.isCameraReady ? (
          <div>
            <Scanner isReady={this.isReady} render={false} />
            <Skeleton
              variant="rectangular"
              width="320px"
              height="320px"
            ></Skeleton>
          </div>
        ) : (
          <Scanner onDetected={this._onDetected} render={true} />
        )}
      </>
    );
  }
}

export default connect(null, { getProductAC })(BarcodeScanner);
