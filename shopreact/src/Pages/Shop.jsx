import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch all products
    const fetchAllProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://fakestoreapi.com/products`);
            setProducts(response.data);  // Store the fetched products
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProducts();  // Call to fetch all products on component mount
    }, []);

    return (
        <section className="flex justify-center gap-2 m-auto container flex-wrap">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <progress className="progress w-56"></progress>
                </div>
            ) : (
                products.map((singleProduct) => (
                    <ProductCard productInfo={singleProduct} key={singleProduct.id} />
                ))
            )}
        </section>
    );
}
