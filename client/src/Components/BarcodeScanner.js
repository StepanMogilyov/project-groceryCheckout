import React, { Component } from "react";
import Scanner from "./Scanner";
import { Fab, TextareaAutosize, Paper } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import getProduct from "../helpers/getProduct";
import { getProductAC } from "../store/product/actionCreators";
import { connect } from "react-redux";

class BarcodeScanner extends Component {
  constructor(props) {
    super(props)
  }
  
  fixMultiplyRequest = [];
  serverProducts = [];

  state = {
    rerender: 0,
    results: [],
  };

  _scan = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  componentDidUpdate(prev) {

  }

  _onDetected = async (result) => {

    this.setState({ results: [] });
    this.setState({ results: this.state.results.concat([result]) });

    if (this.state.results[0]?.codeResult) {
      this.fixMultiplyRequest.push(this.state.results[0].codeResult.code);
    }
    if (this.fixMultiplyRequest.length === 1) {
      this.currentCode = this.fixMultiplyRequest[0];
      const prod = await getProduct(this.currentCode);
      
      if (prod) {
        this.useRdcr(prod);
      } else {
        alert('Товар не найден')
      }
      
      this.state.results = []
      this.fixMultiplyRequest = []
      
    }
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
        <button onClick={() => this.useRdcr({ TEST: 123 })}>Прокинуть объект</button>
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
