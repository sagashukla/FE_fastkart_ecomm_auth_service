import React, { useState } from "react";
import Select from 'react-select'

const options = [
    { value: "SELLER", label: "Seller" },
    { value: "BUYER", label: "Buyer" }
  ];
  
  function UserType(props) {
    const [type, setType] = useState([]);
  
    const handleChange = (type) => {
        setType(type || []);
        console.log("user type value ");
        console.log(type[0].value)
        console.log("user type value 2");
        props.onChange(type[0].value)
    };
  
    return (
      <div>
        User type
        <form>
          <Select
            options={options}
            value={type}
            onChange={handleChange}
            isMulti
          />
        </form>
      </div>
    );
  }
  
  export default UserType;