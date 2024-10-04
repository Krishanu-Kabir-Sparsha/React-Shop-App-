import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../assets/context/cartContext';

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const { addToCart } = useContext(CartContext);

    async function fetchProduct() {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchProduct();
    }, [id]);

    return (
        <div className="container mx-auto py-12">
            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : product ? (
                <div className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-200 p-10 rounded-lg shadow-lg">
                    <div className="flex flex-col md:flex-row items-center">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full md:w-1/3 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                        />
                        <div className="mt-8 md:mt-0 md:ml-10 text-center md:text-left">
                            <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
                            <p className="mt-4 text-lg text-gray-700">{product.description}</p>
                            <p className="mt-5 text-2xl font-semibold text-gray-900">${product.price}</p>
                            <button
                                className="mt-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white py-2 px-6 rounded-full hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-10">Product not found</div>
            )}
        </div>
    );
}
