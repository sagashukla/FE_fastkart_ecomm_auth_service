import { useEffect, useState } from "react";
import ProductComponent from "./ProductComponent"
import {axiosInstances} from './api/axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GET_PRODUCTS = '/api/v1/buyer/products';

const BuyerHome = () => {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        let token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        console.log(config);
        // Function to fetch the product data from the API
        const fetchProductInfo = async () => {
            try {
                const response = await axiosInstances.buyeraxios.get(GET_PRODUCTS, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    }
                  });

                console.log(JSON.stringify(response?.data));
                setProducts(response?.data)
            } catch (err) {
            }
        };
    
        fetchProductInfo();
    }, []);

    return (
        <div>
          <h1>All Products</h1>
          {products.length > 0 ? (
            products.map((productInfo) => (
              <ProductComponent
                key={productInfo.id}
                id={productInfo.id}
                name={productInfo.name}
                categoryName={productInfo.categoryName}
                maxBidAmount={productInfo.maxBidAmount}
                timestamp={productInfo.createdAt}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
}

export default BuyerHome;