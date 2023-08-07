import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const ProductComponent = (props) => {
  const navigate = useNavigate();
  const { id, name, description, minBidAmount, category, sellerId } = props;
  const user = useSelector((state) => state.user.value);

  const handlepdpbutton = ()=>{
    if(user.roleType == "SELLER"){
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
          <strong>Product ID:</strong> {id}
        </li>
        <li>
          <strong>Name:</strong> {name}
        </li>
        <li>
          <strong>Description:</strong> {description}
        </li>
        <li>
          <strong>Minimum Bid Amount:</strong> ${minBidAmount}
        </li>
        <li>
          <strong>Category:</strong> {category}
        </li>
        <li>
          <strong>Seller ID:</strong> {sellerId}
        </li>
        <button onClick={handlepdpbutton} >PDP</button>
      </ul>
    </div>
  );
};

export default ProductComponent;