import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductComponent2 = (props) => {
  const navigate = useNavigate();
  const { id, name, description, minBidAmount, category, sellerId } = props;

  const handlepdpbutton = ()=>{
    navigate("/product-pdp");
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
      </ul>
    </div>
  );
};

export default ProductComponent2;