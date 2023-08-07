import { useEffect } from "react";
import ProductComponent from "./ProductComponent"
import axios from './api/axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GET_PRODUCTS = '/api/v1/seller/products';

const BuyerHome = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);
    const productList = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description of Product 1',
          minBidAmount: 100.0,
          category: 'Category A',
          sellerId: 1001,
        },
        {
          id: 2,
          name: 'Product 2',
          description: 'Description of Product 2',
          minBidAmount: 200.0,
          category: 'Category B',
          sellerId: 1002,
        },
        // Add more productInfo objects as needed
      ];

    useEffect(() => {
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
          <h1>All Products by all selleff</h1>
          {productList.length > 0 ? (
            productList.map((productInfo) => (
              <ProductComponent
                key={productInfo.id}
                id={productInfo.id}
                name={productInfo.name}
                description={productInfo.description}
                minBidAmount={productInfo.minBidAmount}
                category={productInfo.category}
                sellerId={productInfo.sellerId}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
}

export default BuyerHome;