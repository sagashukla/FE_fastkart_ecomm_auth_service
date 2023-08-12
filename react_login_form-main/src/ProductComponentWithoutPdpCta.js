import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductComponentWithoutPdpCta = (props) => {
  const navigate = useNavigate();
  const { userType, id, name, description, minBidAmount, category, sellerName, minBid, maxBid } = props;

  const handleClick = () => {
    let roleType = localStorage.getItem('role-type');

    if(roleType == "SELLER"){
      navigate("/seller-home")
    }
    else{
      navigate("/buyer-home")
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
          <strong>Minimum Bid Amount set by seller:</strong> ${minBidAmount}
        </li>
        <li>
          <strong>Category:</strong> {category}
        </li>
        {userType == "SELLER" ? (        
        <li>
          <strong>Min bid amount:</strong> {minBid}
        </li>) : (<></>)}
        {userType == "SELLER" ? (        
        <li>
          <strong>Max bid amount:</strong> {maxBid}
        </li>) : (<></>)}
        <li>
           <strong>Seller name:</strong> {sellerName}
        </li>

        <button onClick={handleClick}>back</button>
      </ul>
    </div>
  );
};

export default ProductComponentWithoutPdpCta;