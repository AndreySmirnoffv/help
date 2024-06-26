import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {

  const [image, setImage] = useState(false);
  const[productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
  });


  const imageHandler = (e) => {
   setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
   setProductDetails({...productDetails, [e.target.name]: e.target.value})
  };

  const add_product = async () => {  
   
    let responseData;
    let product = productDetails;

    let formData = new FormData();  
    formData.append('product', image);   
    
    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData  
    }).then((res) => res.json())
      .then((data) => {responseData=data}) 
      .catch(error => {
          console.error('Error:', error);
});
       
       if(responseData.success) {
        product.image = responseData.image_url;

         await fetch('http://localhost:4000/addproduct', {  
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product) 
        })
        .then(resp => resp.json())
        .then(data => {
          data.success? alert('Product added!') : alert('Failed')
        }) 
      } 
  }

  

  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input type="text" 
                   name="name" 
                   placeholder="Type here" 
                   value={productDetails.name}
                   onChange={changeHandler}/>
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input type="text" 
                   name="old_price"  
                   placeholder='Type here' 
                   value={productDetails.old_price}
                   onChange={changeHandler}/>
          </div>
          <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input type="text" 
                   name="new_price"  
                   placeholder='Type here' 
                   value={productDetails.new_price} 
                   onChange={changeHandler}/>
          </div>
        </div>
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select name="category" className='add-product-selector' 
                  value={productDetails.category} onChange={changeHandler}>
            <option value="woman">Woman</option>
            <option value="man">Man</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img src={image? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
          </label>
          <input type="file" name="image" 
                 id='file-input' hidden
                 onChange={imageHandler}/>
        </div>
        <button className='addproduct-btn' onClick={add_product}>ADD</button>
    </div>
  )
}

export default AddProduct;