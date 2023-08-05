import React from 'react';
import { useNavigate } from 'react-router-dom';

const BidComponent = (props) => {
  const navigate = useNavigate();
  const { id, amount} = props;

  const handlepdpbutton = ()=>{
    navigate("/product-pdp");
  }
  return (
    <div className="product-detail-container">
      <ul>
        {/* <li>
          <strong>Bid id:</strong> {id}
        </li> */}
        <li>
          <strong>Bid amount:</strong> {amount}
        </li>
      </ul>
    </div>
  );
};

export default BidComponent;