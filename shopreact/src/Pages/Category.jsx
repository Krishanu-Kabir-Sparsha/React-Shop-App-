import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Category() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchProductsByCategory() {
        setLoading(true);
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchProductsByCategory();
    }, [category]);

    return (
        <section className="flex flex-wrap justify-center gap-4 m-auto container mt-20">
            {loading ? (
                <progress className="progress w-56"></progress>
            ) : (
                products.map((product) => (
                    <ProductCard productInfo={product} key={product.id} />
                ))
            )}
        </section>
    );
}
