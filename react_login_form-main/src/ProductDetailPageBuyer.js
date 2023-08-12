
import ProductComponentWithoutPdpCta from "./ProductComponentWithoutPdpCta"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BidComponent from "./BidComponent"
import { useRef, useState, useEffect } from "react";
import {axiosInstances} from "./api/axios"

const GET_PRODUCTS = '/api/v1/buyer/product';
const SUBMIT_BID = '/api/v1/buyer/product/bid';

const ProductDetailPageBuyer = () => {

    const userRef = useRef();

    const [productId, setProductId] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [buyerId, setBuyerId] = useState('');
    const [products, setProducts] = useState([]);
    const [allBidAmounts, setAllBidAmounts] = useState([]);
    const [minBidAmount, setMinBidAmount] = useState(0);
    const [maxBidAmount, setMaxBidAmount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("inside useEffect buyer pdp")
        let token = localStorage.getItem('token');
        let productId1 = localStorage.getItem('productId');
        console.log(productId1)
        // Function to fetch the product data from the API
        const fetchProductInfo = async () => {
            try {
                const response = await axiosInstances.buyeraxios.get(GET_PRODUCTS, {
                    params: { productId: productId1 },
                    headers: {
                      Authorization: `Bearer ${token}`,
                    }
                  });
                // TODO: remove console.logs before deployment
                console.log(JSON.stringify(response?.data));
                setProducts(response?.data)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBuyerId(localStorage.getItem('user-id'));
        setProductId(localStorage.getItem('productId'));

        try {
          let token = localStorage.getItem('token');
            const response = await axiosInstances.buyeraxios.post(SUBMIT_BID,
                JSON.stringify({productId: productId, bidAmount: bidAmount, buyerId: buyerId}),
                {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
        } catch (err) {
            
        }
    }

    return (
      
        <div>
          <h1>Product detail page</h1>
          <section>
                    <h1>Add bid</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="bidamount">
                            bid amount:
                        </label>
                        <input
                            type="text"
                            id="bidamount"
                            autoComplete="off"
                            onChange={(e) => setBidAmount(e.target.value)}
                            value={bidAmount}
                            required
                        />
                        <button>Submit bid</button>
                    </form>
          </section>
          {products.length > 0 ?         <ProductComponentWithoutPdpCta
                key={products[0].id}
                id={products[0].id}
                name={products[0].name}
                description={products[0].description}
                minBidAmount={products[0].minimumBidAmount}
                category={products[0].categoryName}
                bidderName={products[0].bidderName}
                sellerName={products[0].sellerName}
              /> : <p>No data</p>}
  
          
          <p>bid list:-</p>
          {products.length > 0 ? (
            products.map((bidInfo) => (
              <div className="product-detail-container">
              <ul>
                {/* <li>
                  <strong>Bid id:</strong> {id}
                </li> */}
                <li>
                  <strong>Bid amount: {bidInfo.bidAmount}; Bidder name : {bidInfo.bidderName}</strong> 
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

export default ProductDetailPageBuyer;