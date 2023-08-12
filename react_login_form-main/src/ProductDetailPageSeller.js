import { useEffect, useState } from "react";
import ProductComponentWithoutPdpCta from "./ProductComponentWithoutPdpCta"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {axiosInstances} from './api/axios';

const GET_PRODUCTS = '/api/v1/seller/product';

const ProductDetailPageSeller = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);
    const [products, setProducts] = useState([]);
    const [minBidAmount, setMinBidAmount] = useState(0);
    const [maxBidAmount, setMaxBidAmount] = useState(0);
    const [allBidAmounts, setAllBidAmounts] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token')
        let productId = localStorage.getItem('productId');
        const fetchProductInfo = async () => {
            try {
                const response = await axiosInstances.selleraxios.get(GET_PRODUCTS, {
                    params: { id: productId },
                    headers: {
                      Authorization: `Bearer ${token}`,
                    }
                  });
                let response1 = response?.data;
                setProducts(response1)
                setAllBidAmounts(products.map(bid => bid.bidAmount))
            } catch (err) {
            }
        };
    
        fetchProductInfo();
    }, []);

    useEffect(() => {
      console.log(products)
      let allBidAmounts = products.map(bid => bid.bidAmount);

      let minBid = Math.min(...allBidAmounts);
      let maxBid = Math.max(...allBidAmounts);

      setMinBidAmount(minBid)
      setMaxBidAmount(maxBid);
    }, [products, allBidAmounts])

    return (
      
        <div>
          <h1>Product detail page</h1>
          {
            products.length > 0 ? (
<ProductComponentWithoutPdpCta
                      userType = "SELLER"
                      key={products[0].id}
                      id={products[0].id}
                      name={products[0].name}
                      description={products[0].description}
                      minBidAmount={products[0].mimimumBidAmount}
                      category={products[0].categoryName}
                      minBid={minBidAmount}
                      maxBid={maxBidAmount}
                      bidderName={products[0].bidderName}
                      sellerName={products[0].sellerName}
                    />
            ):
            <p>No data found</p>
          }
          
          <p>Bidders list:-</p>
          {products.length > 0 ? (
            products.map((bidInfo) => (
              <div className="product-detail-container">
              <ul>
                <li>
                  <strong>Bidder name: {bidInfo.bidderName}; Bid amount: {bidInfo.bidAmount}</strong> 
                </li>
              </ul>
            </div>
            ))
          ) : (
            <p>No bids.</p>
          )}

        </div>
      );
}

export default ProductDetailPageSeller;