import { useEffect } from "react";
import ProductComponentWithoutPdpCta from "./ProductComponentWithoutPdpCta"
import axios from './api/axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BidComponent from "./BidComponent"

const GET_PRODUCTS = '/api/v1/seller/product';

const ProductDetailPageSeller = () => {

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
        console.log("here my token")
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

    return (
      
        <div>
          <h1>Product detail page</h1>
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

export default ProductDetailPageSeller;