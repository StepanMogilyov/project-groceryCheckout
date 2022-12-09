import React, { Component } from "react";
import Scanner from "./Scanner";
import getProduct from "../../helpers/getProduct";
import { getProductAC } from "../../store/product/actionCreators";
import { connect } from "react-redux";
import soundOfScan from "./soundOfScan.mp3";
import Skeleton from "@mui/material/Skeleton";

class BarcodeScanner extends Component {
  state = {
    isCameraReady: false,
  };
  scanResult = [];
  selectedProductsIDs = [];
  startTimer = false;

  componentDidMount() {
    setTimeout(() => {
    this.setState({ isCameraReady: true });
    }, 1000);
  }

  showConsole() {
    console.log(this.state.isCameraReady);
  }

  componentDidUpdate() {
    this.scanResult = [];
    this.selectedProductsIDs = [];
    this.startTimer = false;
  }

  _scan = () => {
    this.setState({ scanning: !this.state.scanning });
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
          this.startTimer = true;
          alert("Товар уже выбран");
        }
      } else {
        this.startTimer = true;
        alert("Товар не найден");
      }
      if (this.startTimer) {
        this.startTimer = false;
        setTimeout(() => {
          this.scanResult = [];
        }, 2000);
      }
    }
  };

  putProductToAC(arg) {
    const { getProductAC } = this.props;
    getProductAC(arg);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.showConsole()}>showConsole</button>
        {/* <button onClick={() => console.log(this.state.results)}>check</button> */}
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

        {this.state.isCameraReady ? (
          <Scanner onDetected={this._onDetected} />
        ) : (
          <>
            <Skeleton variant="rectangular" width="320px" height="320px">
              {/* <div style={{ paddingTop: "57%" }} /> */}
            </Skeleton>
          </>
        )}
      </div>
    );
  }
}

export default connect(null, { getProductAC })(BarcodeScanner);
