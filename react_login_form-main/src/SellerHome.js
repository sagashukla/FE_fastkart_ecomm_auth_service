import { useEffect, useState } from "react";
import ProductComponent from "./ProductComponent"
import {axiosInstances} from './api/axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GET_PRODUCTS = '/api/v1/seller/products';

const SellerHome = () => {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        let token = localStorage.getItem('token')
        let id = localStorage.getItem('user-id');

        const fetchProductInfo = async () => {
            try {
                const response = await axiosInstances.selleraxios.get(GET_PRODUCTS, {
                    params: { sellerid: id },
                    headers: {
                      Authorization: `Bearer ${token}`,
                    }
                  });
                console.log(JSON.stringify(response?.data));
                setProducts(response?.data)
                console.log(response.headers);
            } catch (err) {
            }
        };

    
        fetchProductInfo();
    }, []);

    const handleAddProduct = ()=>{
      navigate("/add-product")
    }

    return (
      
        <div>
          <h1>All products by seller</h1>
          <button onClick={handleAddProduct} >Add product</button>
          {products.length > 0 ? (
            products.map((productInfo) => (
              <ProductComponent
                key={productInfo.id}
                id={productInfo.id}
                name={productInfo.name}
                description={productInfo.description}
                maxBidAmount={productInfo.maxBidAmount}
                categoryName={productInfo.categoryName}
                timestamp={productInfo.createdAt}
              />
            ))
          ) : (
            <p>No products listed by you! List to sell fast!”.</p>
          )}
        </div>
      );
}

export default SellerHome;