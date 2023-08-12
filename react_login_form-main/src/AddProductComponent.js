import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import selleraxios from './api/axios';
import { axiosInstances } from './api/axios';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DropdownComponent from './DropdownComponent';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const ADD_PRODUCT_URL = '/api/v1/seller/product';
const GET_CATEGORIES = '/api/v1/category'

const AddProduct = () => {
    const navigate = useNavigate();

    const [productName, setProductName] = useState('');

    const [description, setDescription] = useState('');

    const [bidAmount, setBidAmount] = useState('');


    const [sellerId, setSellerId] = useState('');

    const cat = [
        {
            name: "Automobile",
            id: 2
        },
        {
            name: "Electronics",
            id: 2
        },
        {
            name: "Clothes",
            id: 3
        }
    ]

    //const [categories, setCategories] = useState(cat);

    // useEffect(() => {
    //     let token = localStorage.getItem('token')
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await axiosInstances.selleraxios.get(GET_CATEGORIES, {
    //                 headers: {
    //                   Authorization: `Bearer ${token}`,
    //                 }
    //               });
                
    //             console.log("here1")
    //             console.log(JSON.stringify(response?.data))
    //             console.log("here2")
    //         } catch (err) {
    //         }
    //     };
    
    //     fetchCategories();
    // }, [])

    const handleSubmit = async (e) => {
        let token = localStorage.getItem('token')
        setSellerId(localStorage.getItem('user-id'))
        let category = localStorage.getItem('selected-category')
        let categoryId;

        console.log("selected category")
        console.log(category)
        if(category == "Automobile"){
            categoryId = 2;
        }
        else if(category == "Electronics"){
            categoryId = 1;
        }
        else{
            categoryId = 3;
        }
        e.preventDefault();
        try {
            const response = await axiosInstances.selleraxios.post(ADD_PRODUCT_URL,
                JSON.stringify({ name: productName, description: description, minBidAmount: bidAmount, sellerId: sellerId, categoryId: categoryId }),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json' 
                      }
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            navigate("/seller-home");
        } catch (err) {

        }
    }

    const handleLoginClick = ()=>{
        navigate("/seller-home");
    }

    return (
        <>
            {(
                <section>
                    <h1>Add Product</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            autoComplete="off"
                            onChange={(e) => setProductName(e.target.value)}
                            value={productName}
                            required
                        />
                        <label htmlFor="description">
                            Description:
                        </label>
                        <input
                            type="text"
                            id="description"
                            autoComplete="off"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required
                        />
                        <label htmlFor="bidamount">
                            Bid amount:
                        </label>
                        <input
                            type="text"
                            id="bidamount"

                            autoComplete="off"
                            onChange={(e) => setBidAmount(e.target.value)}
                            value={bidAmount}
                            required
                        />
                        <DropdownComponent propscategories={cat}/>
                        <button>Add product</button>
                    </form>
                    <button onClick={handleLoginClick} >Go back</button>
                </section>
            )}
        </>
    )
}

export default AddProduct;
