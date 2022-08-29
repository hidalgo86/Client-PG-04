import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getProducts,
  OrderAlphabetical,
  OrderPrice,
} from "../../redux/actions";

function Sort() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.product);
  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  function handleSort(e) {
    e.preventDefault();
    dispatch(OrderAlphabetical(e.target.value));
    setOrder(e.target.value);
    //  setPage(1);
  }
  function handleSortByPrice(e) {
    e.preventDefault();
    dispatch(OrderPrice(e.target.value));
    setOrder(e.target.value);
  }

  return (
    <div>
      <h2> Sort </h2>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="order"> ALFABÉTICO </option>
          <option value="A-Z"> Ascendente </option>
          <option value="Z-A"> Descendente </option>
        </select>
        <select onChange={(e) => handleSortByPrice(e)}>
          <option value="precio"> PRECIO </option>
          <option value="min_price"> Menor precio </option>
          <option value="max_price"> Mayor precio </option>
        </select>
      </div>
    </div>
  );
}

export default Sort;
