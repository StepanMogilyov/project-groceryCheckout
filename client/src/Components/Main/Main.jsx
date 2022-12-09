import React, { useState } from "react";
import Button from "@mui/material/Button";
import OneProduct from "../OneProduct/OneProduct";
import styles from "./Main.module.css";
import BarcodeScanner from "../Scanner/BarcodeScanner";
import { useDispatch, useSelector } from "react-redux";
import { resetProductsAC } from "../../store/product/actionCreators";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

export default function Main() {
  const [sum, setSum] = useState(0);
  const [rerender, setRerender] = useState(0);
  const [showSmile, setShowSmile] = useState(false);
  const allProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const payBtnHandler = () => {
    dispatch(resetProductsAC());
    setSum(0);
    setRerender(rerender + 1);
    setShowSmile(true);
    setTimeout(() => {
      setShowSmile(false);
    }, 3500);
  };

  const addSumHandler = (price) => {
    setSum(sum + price);
  };

  const decSumHandler = (price) => {
    setSum(sum - price);
  };

  return (
    <div className={styles.main}>
      <BarcodeScanner rerender={rerender} />

      {showSmile ? (
        <><InsertEmoticonIcon
          style={{ height: "110px", width: "110px", color: "green", marginLeft: '100px' }}
        />
        <h1 style={{color: 'green', marginLeft: '20px'}}>Спасибо за покупку</h1>
        </>
      ) : (
        <></>
      )}

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
              onClick={payBtnHandler}
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
