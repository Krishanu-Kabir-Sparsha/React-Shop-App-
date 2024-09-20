import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";


export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchProducts() {

        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products`);
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
        
    }

    useEffect (() => {fetchProducts();

    }, []);


  return (
    <section className="flex justify-center gap-2 m-auto container flex-wrap">
         {
            loading? (
                 <progress className="progress w-56"></progress> ) : (
                    products.map((singleProducts) => <ProductCard productInfo={singleProducts} key={singleProducts.id}/>) 
                 )  //productInfo={singleProducts}; for destructuring in shop.jsx
         }

         
    </section>

  );
  
}
