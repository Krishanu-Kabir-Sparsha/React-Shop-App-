import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../assets/context/cartContext';

export default function Product() {
  
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const {addToCart} = useContext(CartContext); //destructuring and use function from CartContext as it was handler

  async function fetchProduct() {
     setLoading(true);
     const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
     setProduct(response.data);
     setLoading(false);
  }

  //now to fetch data

  useEffect (()=> {
    fetchProduct();
  }, []);
  
  return (
    
    <div>
      {
        loading ? <span className="loading loading-dots loading-lg"></span> :  <div className="card lg:card-side bg-base-100 shadow-xl m-auto container">
        <figure>
          <img
            src= {product?.image} // optional chaining used here cz of the before async await uses.. 
            // could also use destructure, however it was done already and passed in product.. 
            alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product?.title}</h2>
          <p>{product?.price}$</p>
          <div className="card-actions justify-end">
            <button onClick={ ()=> addToCart(product) } className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
      }
    </div>
  )
}
