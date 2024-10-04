import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../assets/context/cartContext";
import axios from "axios";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    }
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setHighlightedIndex(-1);

    if (query.length > 0) {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredProducts);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const foundProduct = products.find(
      (product) => product.title.toLowerCase() === searchQuery.toLowerCase()
    );
    if (foundProduct) {
      setSearchQuery("");
      setSuggestions([]);
      navigate(`/product/${foundProduct.id}`);
    }
  };

  const handleSuggestionClick = (productId) => {
    setSearchQuery("");
    setSuggestions([]);
    navigate(`/product/${productId}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        const selectedProduct = suggestions[highlightedIndex];
        if (selectedProduct) {
          handleSuggestionClick(selectedProduct.id);
        }
      } else {
        handleSearch(e);
      }
    }
  };

  const categories = [
    "Electronics",
    "Jewelery",
    "Men's Clothing",
    "Women's Clothing",
  ];

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50 mx-auto px-4 md:px-10">
      <div className="flex-1">
        <NavLink
          to="/"
          className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white font-bold normal-case text-lg md:text-xl"
        >
          Shop React
        </NavLink>
      </div>

      <div className="flex-1 relative flex items-center">
        <form
          onSubmit={handleSearch}
          className="flex justify-center items-center w-full"
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="🔍 Search products..."
              className="input input-bordered w-full max-w-xs rounded-full pl-10 text-xs sm:text-sm md:text-base"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </form>

        {suggestions.length > 0 && (
          <div className="absolute left-0 top-full mt-1 w-full bg-base-100 shadow-lg z-20 rounded-md">
            <ul className="menu menu-compact p-2">
              {suggestions.map((product, index) => (
                <li
                  key={product.id}
                  className={`hover:bg-blue-500 hover:text-white cursor-pointer ${
                    highlightedIndex === index ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => handleSuggestionClick(product.id)}
                >
                  {product.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex-none flex items-center gap-4">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white font-semibold text-sm sm:text-base"
          >
            Categories
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-100 rounded-box z-[100] mt-3 p-2 shadow-lg w-32 sm:w-40"
          >
            {categories.map((category, index) => (
              <li key={index}>
                <NavLink
                  to={`/${category.toLowerCase()}`}
                  className="text-sm font-semibold text-gray-800 py-2 px-4 rounded-md"
                >
                  {category}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cart.length}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-blue-200 z-[100] mt-3 w-48 sm:w-56 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{cart.length} items</span>
              <div className="card-actions">
                <NavLink to="/checkout" className="btn btn-primary btn-block">
                  View Cart
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-8 sm:w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 sm:w-52 p-2 shadow-lg"
            >
                <li>
                  <NavLink to="/profile">Profile</NavLink> {/* Link to profile page */}
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
        </ul>
        </div>
      </div>
    </div>
  );
}
