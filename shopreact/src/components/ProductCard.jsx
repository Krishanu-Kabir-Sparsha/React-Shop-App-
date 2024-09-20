import React from 'react'
import { NavLink } from 'react-router-dom';

export default function ProductCard( {productInfo} ) { //destructuring
    const {title, description, image, price, id} = productInfo;

    
  return (
    <div className="card bg-base-100 image-full w-96 shadow-xl">
  <figure>
    <img
      src= {image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>{description}</p>
    <div className="card-actions justify-end">
      <NavLink to={`/product/${id}`} className="btn btn-primary">Buy at ${price}</NavLink>
    </div>
  </div>
</div>
  )
}
