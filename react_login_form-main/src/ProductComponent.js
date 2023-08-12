import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {login } from "./features/user";

const ProductComponent = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, name, categoryName, timestamp, maxBidAmount } = props;
  const user = useSelector((state) => state.user.value);

  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });

  const handlepdpbutton = ()=>{
    dispatch(login({
      productId: id 
    }))
    localStorage.setItem('productId', id);
    if(localStorage.getItem('role-type') == "SELLER"){
      navigate("/product-pdp-seller");
    }
    else{
      navigate("/product-pdp-buyer");
    }
  }
  return (
    <div className="product-detail-container">
      <h1>Product Detail - {name}</h1>
      <ul>
        <li>
          <strong>Name:</strong> {name}
        </li>
        <li>
          <strong>Category:</strong> {categoryName}
        </li>
        <li>
          <strong>Max bid amount: </strong> ${maxBidAmount}
        </li>
        <li>
          <strong>Created date:</strong> {formattedDate}
        </li>
        <button onClick={handlepdpbutton} >PDP</button>
      </ul>
    </div>
  );
};

export default ProductComponent;