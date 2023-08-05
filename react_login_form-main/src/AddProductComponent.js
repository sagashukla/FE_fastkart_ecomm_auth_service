import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const ADD_PRODUCT_URL = '/api/v1/seller/product';

const AddProduct = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [productName, setProductName] = useState('');

    const [description, setDescription] = useState('');

    const [bidAmount, setBidAmount] = useState('');

    const [category, setCategory] = useState('');

    const [sellerId, setSellerId] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(ADD_PRODUCT_URL,
                JSON.stringify({ name: productName, description: description, minBidAmount: bidAmount, category: category, sellerId: sellerId }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            navigate("/login");
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    const handleLoginClick = ()=>{
        navigate("/seller-home");
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Add Product</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            ref={userRef}
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
                            ref={userRef}
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
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setBidAmount(e.target.value)}
                            value={bidAmount}
                            required
                        />

                        <label htmlFor="category">
                            Category:
                        </label>
                        <input
                            type="text"
                            id="category"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            required
                        />

                       <label htmlFor="selledid">
                            Seller id
                        </label>
                        <input
                            type="text"
                            id="sellerid"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setSellerId(e.target.value)}
                            value={sellerId}
                            required
                        />
                        <button>Add product</button>
                    </form>
                    <button onClick={handleLoginClick} >Go back</button>
                </section>
            )}
        </>
    )
}

export default AddProduct;
