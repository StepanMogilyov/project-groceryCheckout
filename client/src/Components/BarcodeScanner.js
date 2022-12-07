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
  selectedProductsIDs = [];

  state = {
    results: [],
  };

  _scan = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  _onDetected = async (result) => {
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
        if (!this.selectedProductsIDs.includes(prod.id)) {
          this.selectedProductsIDs.push(prod.id);

          this.useRdcr(prod);

          setTimeout(() => {
            this.res = [];
          }, 800);
        } else {
          setTimeout(() => {
            this.res = [];
          }, 800);

          alert("Товар уже выбран");
        }
      } else {
        setTimeout(() => {
          this.res = [];
        }, 800);
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
        <button
          onClick={() =>
            this._onDetected({
              codeResult: {
                code: "000018321651500001",
                start: 51,
                end: 358,
                codeset: 99,
                startInfo: {
                  error: 0.09486166007905138,
                  code: 105,
                  start: 51,
                  end: 74,
                  correction: {
                    bar: 0.5454545454545454,
                    space: 0.4166666666666667,
                  },
                },
                decodedCodes: [
                  {
                    code: 105,
                    start: 51,
                    end: 74,
                    correction: {
                      bar: 0.5454545454545454,
                      space: 0.4166666666666667,
                    },
                  },
                  {
                    error: 0.08000000000000002,
                    code: 0,
                    start: 74,
                    end: 98,
                    correction: {
                      bar: 0.7058823529411765,
                      space: 0.5429864253393665,
                    },
                  },
                  {
                    error: 0.05780471849413351,
                    code: 0,
                    start: 98,
                    end: 122,
                    correction: {
                      bar: 0.5862068965517241,
                      space: 0.540078201368524,
                    },
                  },
                  {
                    error: 0.07181094891882243,
                    code: 18,
                    start: 122,
                    end: 146,
                    correction: {
                      bar: 0.6304347826086957,
                      space: 0.5410980641066329,
                    },
                  },
                  {
                    error: 0.059752728162194305,
                    code: 32,
                    start: 146,
                    end: 170,
                    correction: {
                      bar: 0.6133333333333332,
                      space: 0.5407399780340473,
                    },
                  },
                  {
                    error: 0.08427767541603091,
                    code: 16,
                    start: 170,
                    end: 194,
                    correction: {
                      bar: 0.67618332081142,
                      space: 0.49926060217655405,
                    },
                  },
                  {
                    error: 0.0490397759483671,
                    code: 51,
                    start: 194,
                    end: 218,
                    correction: {
                      bar: 0.5965934558493948,
                      space: 0.5558295416577613,
                    },
                  },
                  {
                    error: 0.07428062596191581,
                    code: 50,
                    start: 218,
                    end: 244,
                    correction: {
                      bar: 0.5781540189176348,
                      space: 0.4944184106512989,
                    },
                  },
                  {
                    error: 0.055034537392939155,
                    code: 0,
                    start: 244,
                    end: 269,
                    correction: {
                      bar: 0.5849092750212102,
                      space: 0.5576305319807652,
                    },
                  },
                  {
                    error: 0.10693299181451375,
                    code: 1,
                    start: 269,
                    end: 297,
                    correction: {
                      bar: 0.5824162541193848,
                      space: 0.42800051294506797,
                    },
                  },
                  {
                    error: 0.06469813226203248,
                    code: 2,
                    start: 297,
                    end: 324,
                    correction: {
                      bar: 0.5833338229899665,
                      space: 0.5001999003575927,
                    },
                  },
                  {
                    error: 0.046877231818588654,
                    code: 106,
                    start: 324,
                    end: 358,
                    correction: {
                      bar: 0.5052630016387072,
                      space: 0.4761270242155427,
                    },
                  },
                ],
                endInfo: {
                  error: 0.046877231818588654,
                  code: 106,
                  start: 324,
                  end: 358,
                  correction: {
                    bar: 0.5052630016387072,
                    space: 0.4761270242155427,
                  },
                },
                direction: 1,
                format: "code_128",
              },
              line: [
                {
                  x: 206.64829400723121,
                  y: 213.66599256004056,
                },
                {
                  x: 593.4266479253431,
                  y: 223.33577282054662,
                },
              ],
              angle: 0.024995624099183468,
              pattern: [
                1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0,
                1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1,
                1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0,
                0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1,
                1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
                0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
                0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0,
              ],
              box: [
                [237.07672026047567, 276.9268037462303],
                [240.1998757957312, 152.00473474223833],
                [562.9982216720987, 160.0749616343569],
                [559.8750661368431, 284.99703063834886],
              ],
              boxes: [
                [
                  [237.07672026047567, 276.9268037462303],
                  [240.1998757957312, 152.00473474223833],
                  [562.9982216720987, 160.0749616343569],
                  [559.8750661368431, 284.99703063834886],
                ],
              ],
            })
          }
        >
          _onDetected
        </button>
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
