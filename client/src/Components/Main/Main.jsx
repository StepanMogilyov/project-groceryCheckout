import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import getProduct from '../../helpers/getProduct';
import OneProduct from '../OneProduct/OneProduct';
import styles from './Main.module.css';
import BarcodeScanner from '../BarcodeScanner';
import { useSelector } from 'react-redux';


export default function Main() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [sum, setSum] = useState(0);

  const allProducts = useSelector((state) => state.product)


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
      <button onClick={() => console.log(allProducts)}>Глобал стейт</button>
      
      <BarcodeScanner />
      {/* <Box
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
      </Box> */}
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
