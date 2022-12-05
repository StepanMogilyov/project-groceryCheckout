import React, { Component, useReducer } from 'react';
import Scanner from './Scanner';
import { Fab, TextareaAutosize, Paper, Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import getProduct from '../helpers/getProduct';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProductAC } from '../store/user/actionCreators';
import { store } from '../index';
import { connect } from 'react-redux';

function useDispFunc(pr) {
  return useDispatch();
}

class BarcodeScanner extends Component {
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
    const prod = await getProduct(this.state.results[0].codeResult.code);
    // useRdcr(prod);
  };

  useRdcr(arg) {
    this.setState({ productFromServer: arg });
    // useGetProductAC(this.state.productFromServer);
    console.log('props: ', this.props.useGetProductAC());
  }

  render() {
    return (
      <div>
        <button onClick={() => this.useRdcr(['TEST'])}>STATE</button>
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
          defaultValue={'No data scanned'}
          value={
            this.state.results[0]
              ? this.state.results[0].codeResult.code
              : 'No data scanned'
          }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    useGetProductAC: () => dispatch(useGetProductAC()),
  };
};

export default connect(null, mapDispatchToProps)(BarcodeScanner);
