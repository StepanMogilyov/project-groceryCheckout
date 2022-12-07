import React, { Component } from "react";
import Scanner from "./Scanner";
import { Fab, TextareaAutosize, Paper } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import getProduct from "../helpers/getProduct";
import { getProductAC } from "../store/product/actionCreators";
import { connect } from "react-redux";

class BarcodeScanner extends Component {

  res = [];

  state = {
    results: [],
  };

  _scan = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  _onDetected = async (result) => {
    console.log("_onDetected");
    // this.setState({ results: [] });
    // if (this.state.results.length >= 0) {
    //   this.setState({ results: this.state.results.concat([result]) });
    //   this.setState({ counter: this.state.counter: this.counter + 1 })
    //   console.log('counter: ', this.counter);
    // }

    this.res.push(result);

    if (this.res.length === 1) {
      this.currentCode = this.res[0].codeResult.code;
      const prod = await getProduct(this.currentCode);
      if (prod) {
        this.useRdcr(prod);
      } else {
        alert("Товар не найден");
      }
    }

    //    this.currentCode = this.state.results[0].codeResult.code;
    //    const prod = await getProduct(this.currentCode);
    //    console.log('prod: ', prod);

    // setTimeout(() => {
    //   this.state.results = [];
    //   console.log('STATE CLEARED', this.state.results);
    // }, 100)
    // this.fixMultiplyRequest = []
  };

  useRdcr(arg) {
    // this.state.rerender += 1
    // this.render()
    const { getProductAC } = this.props;
    getProductAC(arg);
  }

  render() {
    return (
      <div>
        <button onClick={() => this._onDetected(123)}>_onDetected</button>
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
          maxRows={4}
          // defaultValue={"No data scanned"}
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     asdf: () => dispatch(getProductAC(productFromServ)),
//   };
// };

// export default connect(null, mapDispatchToProps)(BarcodeScanner);
// export default BarcodeScanner;
export default connect(null, { getProductAC })(BarcodeScanner);
