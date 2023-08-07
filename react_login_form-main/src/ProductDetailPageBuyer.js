
import ProductComponentWithoutPdpCta from "./ProductComponentWithoutPdpCta"
import axios from './api/axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BidComponent from "./BidComponent"
import { useRef, useState, useEffect } from "react";

const GET_PRODUCTS = '/api/v1/seller/products';
const SUBMIT_BID = '/api/v1/buyer/product/bid';

const ProductDetailPageBuyer = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [productId, setProductId] = useState(0);
    const [bidAmount, setBidAmount] = useState(0);

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);
    const productInfo = 
        {
          id: 1,
          name: 'Product 1',
          description: 'Description of Product 1',
          minBidAmount: 100.0,
          category: 'Category A',
          sellerId: 1001,
        } // Add more productInfo objects as needed
      ;
    const bidList = [
      {
        bidId: 1,
        bidAmount: "10$"
      },
      {
        bidId: 2,
        bidAmount: "20$"
      },
      {
        bidId: 3,
        bidAmount: "30$"
      }
    ]

    useEffect(() => {
        // const authProvider = AuthProvider();
        console.log(user.token)
        // let token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU0VMTEVSIiwic3ViIjoiam95QGdtYWlsLmNvbSIsImlhdCI6MTY5MTIzMTk3OSwiZXhwIjoxNjkxMjMzNDE5fQ.y3SstAQz0BclzBYMmpj1cUxhiwUt8k62vhGBnLeQ2tk";
        // const config = {
        //     headers: { Authorization: `Bearer ${token}` }
        // };
        // console.log(config);
        // // Function to fetch the product data from the API
        // const fetchProductInfo = async () => {
        //     try {
        //         const response = await axios.get(GET_PRODUCTS, {
        //             params: { id: 1 },
        //             config
        //           });
        //         // TODO: remove console.logs before deployment
        //         console.log(JSON.stringify(response?.data));
        //         //console.log(JSON.stringify(response))
        //     } catch (err) {
        //     }
        // };
    
        //fetchProductInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(SUBMIT_BID,
                JSON.stringify({productId: productId, bidAmount: bidAmount}),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            navigate("/login");
        } catch (err) {
            
        }
    }

    return (
      
        <div>
          <h1>Product detail page</h1>
          <section>
                    <h1>Add bid</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="productid">
                            Product id:
                        </label>
                        <input
                            type="text"
                            id="productid"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setProductId(e.target.value)}
                            value={productId}
                            required
                        />
                        <label htmlFor="bidamount">
                            bid amount:
                        </label>
                        <input
                            type="text"
                            id="bidamount"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setBidAmount(e.target.value)}
                            value={bidAmount}
                            required
                        />
                        <button>Submit bid</button>
                    </form>
          </section>
          <ProductComponentWithoutPdpCta
                key={productInfo.id}
                id={productInfo.id}
                name={productInfo.name}
                description={productInfo.description}
                minBidAmount={productInfo.minBidAmount}
                category={productInfo.category}
                sellerId={productInfo.sellerId}
              />
          {bidList.length > 0 ? (
            bidList.map((bidInfo) => (
              <BidComponent
                id={bidInfo.bidId}
                amount={bidInfo.bidAmount}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
}

export default ProductDetailPageBuyer;