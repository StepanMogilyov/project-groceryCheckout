import React, { useState, useEffect } from "react";
import { Button, Chip } from "@mui/material";
import styles from "./OneProduct.module.css";

export default function OneProduct({ el, addSumHandler, decSumHandler }) {
  const [price, setPrice] = useState(el.price);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    addSumHandler(el.price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const incHandler = () => {
    setPrice(price + el.price);
    setQuantity(quantity + 1);
    addSumHandler(el.price);
  };

  const decHandler = () => {
    if (price > 0) {
      setPrice(price - el.price);
      setQuantity(quantity - 1);
      decSumHandler(el.price);
    }
  };

  return (
    <>
      <div>{el.name}</div>
      <div>Цена за штуку: {el.price}р</div>
      <div>{quantity} шт.</div>
      <Button onClick={decHandler} variant="contained" color="error">
        -
      </Button>
      <Chip label={`${price}р`} />
      <Button onClick={incHandler} variant="contained" color="success">
        +
      </Button>
      <hr className={styles.hr} />
    </>
  );
}
