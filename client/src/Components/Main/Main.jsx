import React, { useState } from "react";
import Button from "@mui/material/Button";
import OneProduct from "../OneProduct/OneProduct";
import styles from "./Main.module.css";
import BarcodeScanner from "../Scanner/BarcodeScanner";
import { useDispatch, useSelector } from "react-redux";
import { resetProductsAC } from "../../store/product/actionCreators";

export default function Main() {
  const [sum, setSum] = useState(0);
  const [resetAcc, setResetAcc] = useState(false);

  const allProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const resetStateHandler = () => {
    dispatch(resetProductsAC());
    setResetAcc(!resetAcc);

    // setTimeout(() => {

    //   setResetAcc(false);
    // }, 300)
  };
  console.log("render");

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
      {allProducts.length ? (
        <div className={styles.products}>
          <div className={styles.sum}>Сумма покупки: {sum}</div>
          {allProducts.map((el) => (
            <OneProduct
              el={el}
              addSumHandler={addSumHandler}
              decSumHandler={decSumHandler}
              key={el.id}
            />
          ))}
          <div className={styles.payBtn}>
            <Button
              onClick={resetStateHandler}
              type="submit"
              variant="contained"
              color="success"
            >
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
