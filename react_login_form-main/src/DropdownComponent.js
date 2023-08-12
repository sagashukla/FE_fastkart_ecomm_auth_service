import React, { useState } from "react";

const DropdownComponent = ({propscategories}) => {
  
  const [categories, setcategories] = useState(propscategories);

  const handleChange = (event) => {
    setcategories(categories.map((category) => {
      if (category.name === event.target.value) {
        category.selected = true;
      } else {
        category.selected = false;
      }
      console.log("selected value")
      console.log(category.name)
      return category;
    }));
    const selectedCategory = categories.find((category) => category.selected);
    console.log("selected value:", selectedCategory.name);
    localStorage.setItem('selected-category', selectedCategory.name)
    localStorage.setItem('selected-type', selectedCategory.name)
  };

  return (
    <form action="/action_page.php">
      <label for="categories">Choose a car:</label>
      <select name="categories" id="categories" onChange={handleChange}>
        {categories.map((category) => (
          <option key={category.id} value={category.name} selected={category.selected}>
            {category.name}
          </option>
        ))}
      </select>
    </form>
  );
}

export default DropdownComponent;