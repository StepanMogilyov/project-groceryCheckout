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
  constructor(props) {
    super(props);
  }

  fixMultiplyRequest = [];
  serverProducts = [];

  state = {
    results: [],
    productFromServer: [],
  };

  // hook = () => {
  //   dispatch(getProductAC(123));
  // };

  _scan = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  _onDetected = async (result) => {
    this.setState({ results: [] });
    this.setState({ results: this.state.results.concat([result]) });

    if (this.state.results[0].codeResult) {
      this.fixMultiplyRequest.push(this.state.results[0].codeResult.code);
    }
    if (this.fixMultiplyRequest.length === 1) {
      this.currentCode = this.fixMultiplyRequest[0];
      const prod = await getProduct(this.currentCode);

      // setTimeout(() => {
      //   this.fixMultiplyRequest = [];
      // }, 200);

      if (prod) {
        this.useRdcr(prod);
      }
    }
  };

  useRdcr(arg) {
    const { getProductAC } = this.props;                
    getProductAC(arg);

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
    asdf: () => dispatch(getProductAC(productFromServ)),
  };
};

// export default connect(null, mapDispatchToProps)(BarcodeScanner);
// export default BarcodeScanner;
export default connect(null, { getProductAC })(BarcodeScanner);
