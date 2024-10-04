import React, { useContext, useState } from "react";
import { CartContext } from "../assets/context/cartContext";
import CheckoutForm from "../CheckoutForm";

export default function Checkout() {
  const { cart, removeFromCart } = useContext(CartContext);
  const [newItem, setNewItem] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState(""); // For notifications

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  // Delete an item from the cart
const handleDelete = (id) => {
  console.log("Cart before delete:", cart);
  removeFromCart(id); // Use removeFromCart to update the cart

  // Use the latest cart state to check the length
  const updatedCart = cart.filter(item => item.id !== id);
  
  if (updatedCart.length === 0) {
    showMessage("Your cart is now empty.");
  } else {
    showMessage("Item deleted from cart.");
  }

  // Set the cart to the updated state if needed
  // setCart(updatedCart); // Only if cart is local state in Checkout
};

  // Simulated search for items (replace this with actual API call)
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setNewItem(query);
    if (query.length > 2) {
      // Simulate fetching data (replace this with actual API call)
      const results = [
        { id: 1, title: "New Item 1", price: 50 },
        { id: 2, title: "New Item 2", price: 100 },
      ];
      const filteredResults = results.filter((item) =>
        item.title.toLowerCase().includes(query)
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  // Add a new item to the cart
  const handleAddItem = (item) => {
    const isItemInCart = cart.some((cartItem) => cartItem.id === item.id);
    if (isItemInCart) {
      showMessage("Item is already in the cart");
    } else {
      addToCart(item); // Call addToCart from context
      showMessage("Item added to cart");
    }
    setNewItem("");
    setSearchResults([]);
  };

  // Show temporary message
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000); // Message will disappear after 3 seconds
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {cart.length === 0 ? (
        <div className="text-center text-2xl font-bold text-gray-700">
          Your Cart is Empty
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Checkout summary */}
          <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-2/3">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Checkout
            </h2>

            {/* Notification message */}
            {message && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
                <span className="block sm:inline">{message}</span>
              </div>
            )}

            <table className="table-auto w-full mb-6">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                  <th className="py-2">#</th>
                  <th className="py-2 text-left">Product Name</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((cartItem, index) => (
                  <tr key={cartItem.id} className="text-gray-700 border-b">
                    <td className="py-3 text-center">{index + 1}</td>
                    <td className="py-3 text-left">{cartItem.title}</td>
                    <td className="py-3 text-right">${cartItem.price}</td>
                    <td className="py-3 text-right">
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(cartItem.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mb-4">
              <span className="text-2xl font-semibold">Total: </span>
              <span className="text-2xl font-bold text-blue-500">
                ${calculateTotal()}
              </span>
            </div>

            {/* Search and add items */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Add More Items
              </h3>
              <input
                type="text"
                value={newItem}
                onChange={handleSearch}
                placeholder="Search for items..."
                className="input input-bordered w-full mb-2"
              />
              {searchResults.length > 0 && (
                <div className="bg-white p-4 border rounded-lg shadow-lg">
                  <ul>
                    {searchResults.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center mb-2"
                      >
                        <span>
                          {item.title} - ${item.price}
                        </span>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleAddItem(item)}
                        >
                          Add
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Payment form */}
          <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-1/3">
            <CheckoutForm />
          </div>
        </div>
      )}
    </div>
  );
}
