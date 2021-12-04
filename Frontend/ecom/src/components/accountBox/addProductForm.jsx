import React, { useState } from "react";
import "./styles.css";
import { Dropdown, DropdownButton } from 'react-bootstrap';
const AddProductForm = () => {
   
  const [formData, setFormData] = useState({
    price: "",
    quantity: "",
    description: "",
    image: "",
    collection:""
  });

  const updateFormData = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const { price, quantity, description, image, collection } = formData;

  return (
    <form>
      <input
        value={price}
        onChange={e => updateFormData(e)}
        placeholder="price"
        type="number"
        name="price"
        required
      />
      <input
        value={quantity}
        onChange={e => updateFormData(e)}
        placeholder="quantity"
        type="number"
        name="quantity"
        required
      />
      <input
        value={description}
        onChange={e => updateFormData(e)}
        placeholder="description"
        type="text"
        name="description"
        required
      />
      {/* <image
        value={image}
        onChange={e => updateFormData(e)}
        placeholder="image"
        type="image"
        name="image"
        required
      /> */}

{/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
</DropdownButton> */}
{/* 
<Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown> */}
<label>
    Collections : 
          
          <select type= "button">
           <option value="Electronics">Electronics</option>
            <option value="Food">Food</option>
            <option value="Book">Book</option>
            <option value="Accessories">Accessories</option>
          </select>
        </label>

      <button type="submit">Submit</button>
    </form>
  );
};


export default  AddProductForm;
