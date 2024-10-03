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

    // Fetch product whenever the id changes
    useEffect(() => {
        fetchProduct();
    }, [id]);

    return (
        <div>
            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : product ? (
                <div className="container mx-auto p-5">
                    <div className="flex">
                        <img src={product.image} alt={product.title} className="w-1/3 object-cover rounded-lg" />
                        <div className="ml-10">
                            <h1 className="text-3xl font-bold">{product.title}</h1>
                            <p className="mt-5">{product.description}</p>
                            <p className="mt-5 text-xl font-semibold">${product.price}</p>
                            <button
                                className="mt-5 btn btn-primary"
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
