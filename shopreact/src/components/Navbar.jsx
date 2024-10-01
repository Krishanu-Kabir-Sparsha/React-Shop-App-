import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../assets/context/cartContext';

export default function Navbar() {
    const { cart } = useContext(CartContext);

    // Sample categories
    const categories = ['Electronics', 'Jewelery', 'Men\'s Clothing', 'Women\'s Clothing'];

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <NavLink to="/" className="btn btn-ghost text-xl">Shop React</NavLink>
                <NavLink to="/">Shop</NavLink>
            </div>
            <div className="flex-none">
                {/* Categories Dropdown */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost transition-all duration-200 ease-in-out hover:bg-gray-100">
                        Categories
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow transition-all duration-200 ease-in-out scale-95 opacity-0 transform group-hover:scale-100 group-hover:opacity-100"
                    >
                        {categories.map((category, index) => (
                            <li key={index}>
                                <NavLink to={`/${category.toLowerCase()}`} className="justify-between hover:text-primary">
                                    {category}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle transition-all duration-200 ease-in-out hover:bg-gray-100">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="badge badge-sm indicator-item">{cart.length}</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[100] mt-3 w-52 shadow transition-all duration-200 ease-in-out opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                    >
                        <div className="card-body">
                            <span className="text-lg font-bold">{cart.length} items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <NavLink to="/checkout" className="btn btn-primary btn-block">View Cart</NavLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar transition-all duration-200 ease-in-out hover:bg-gray-100">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Avatar"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow transition-all duration-200 ease-in-out opacity-0 scale-95 transform group-hover:opacity-100 group-hover:scale-100"
                    >
                        <li>
                            <a className="justify-between hover:text-primary">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a className="hover:text-primary">Settings</a></li>
                        <li><a className="hover:text-primary">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
