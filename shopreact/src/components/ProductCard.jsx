import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ProductCard({ productInfo }) {
    const { title, description, image, price, id } = productInfo;

    return (
        <div className="card bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out w-60 mx-2">
            <figure className="p-4">
                <img
                    src={image}
                    alt={title}
                    className="object-cover h-40 w-full rounded-md"
                />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                    {title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">{description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">${price}</span>
                    <NavLink
                        to={`/product/${id}`}
                        className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-3 py-1"
                    >
                        Buy Now
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
