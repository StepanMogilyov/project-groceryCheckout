import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import getProduct from '../../helpers/getProduct';
import OneProduct from '../OneProduct/OneProduct';
import styles from './Main.module.css';
import javascriptBarcodeReader from 'javascript-barcode-reader';

export default function Main() {
  javascriptBarcodeReader({
    /* Image ID || HTML5 Image || HTML5 Canvas || HTML5 Canvas ImageData || Image URL */
    // image: source,
    barcode: 'code-2of5',
    // barcodeType: 'industrial',
    options: {
      // useAdaptiveThreshold: true // for images with sahded portions
      // singlePass: true
    },
  })
    .then((code) => {
      console.log(code);
    })
    .catch((err) => {
      console.log(err);
    });

  const [checkedItems, setCheckedItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [sum, setSum] = useState(0);

  const searchProductHandler = async (e) => {
    e.preventDefault();

    const inputValue = Number(e.target.productActicle.value);
    if (inputValue) {
      if (!checkedItems.includes(inputValue)) {
        setCheckedItems([...checkedItems, inputValue]);
        const product = await getProduct(inputValue);
        if (product) {
          setProducts([...products, product]);
        } else {
          alert('Продукт не найден');
        }
      } else {
        alert('Товар уже выбран');
      }
    } else {
      alert('Номер не корректный');
    }
  };

  const addSumHandler = (price) => {
    setSum(sum + price);
  };

  const decSumHandler = (price) => {
    setSum(sum - price);
  };

  return (
    <div className={styles.main}>
      <Box
        onSubmit={searchProductHandler}
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="productActicle"
          label="Артикул товара"
          variant="filled"
          color="success"
          focused
        />
        <p className={styles.btn}>
          <Button type="submit" variant="contained">
            Искать
          </Button>
        </p>
      </Box>
      {products.length ? (
        <div className={styles.products}>
          <div className={styles.sum}>Сумма покупки: {sum}</div>
          {products.map((el) => (
            <OneProduct
              el={el}
              addSumHandler={addSumHandler}
              decSumHandler={decSumHandler}
              key={el.id}
            />
          ))}
          <div className={styles.payBtn}>
            <Button type="submit" variant="contained" color="success">
              Оплатить
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
