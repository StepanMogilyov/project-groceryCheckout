import React, { Component, useReducer } from "react";
import Scanner from "./Scanner";
import { Fab, TextareaAutosize, Paper, Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import getProduct from "../helpers/getProduct";
import { useSelector, useDispatch } from "react-redux";
import { getProductAC } from "../store/product/actionCreators";
import { store } from "../index";
import { connect } from "react-redux";

let productFromServ;

class BarcodeScanner extends Component {
  fixMultiRequest = [];
  serverProducts = [];

  state = {
    results: [],
    productFromServer: [],
  };

  _scan = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  _onDetected = async (result) => {
    this.setState({ results: [] });
    this.setState({ results: this.state.results.concat([result]) });

    if (this.state.results[0].codeResult) {
      this.fixMultiRequest.push(this.state.results[0].codeResult.code);
    }
    if (this.fixMultiRequest.length <= 1) {
      this.currentCode = this.fixMultiRequest[0];
      const prod = await getProduct(this.currentCode);
      this.fixMultiRequest = []
      if (prod) {
        this.useRdcr(prod);
      }
    }
  };

  useRdcr(arg) {
    // this.setState({ productFromServer: arg });

    productFromServ = arg;
    this.props.getProductAC();

    // productFromServ.push(arg)
    // this.props.getProductAC(arg);
    // console.log(this.props);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.useRdcr({ TEST: 123 })}>STATE</button>
        <Link to="/">
          <Fab style={{ marginRight: 10 }} color="secondary">
            <ArrowBack />
          </Fab>
        </Link>
        <span>Barcode Scanner</span>

        <Paper
          variant="outlined"
          style={{ marginTop: 30, width: 640, height: 320 }}
        >
          <Scanner onDetected={this._onDetected} />
        </Paper>

        <TextareaAutosize
          style={{ fontSize: 32, width: 320, height: 100, marginTop: 30 }}
          rowsMax={4}
          defaultValue={"No data scanned"}
          value={
            this.state.results[0]
              ? this.state.results[0].codeResult?.code
              : "No data scanned"
          }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductAC: () => dispatch(getProductAC(productFromServ)),
  };
};

export default connect(null, mapDispatchToProps)(BarcodeScanner);
