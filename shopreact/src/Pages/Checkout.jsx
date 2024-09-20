import React, { useContext } from "react";
import { CartContext } from "../assets/context/cartContext";
import CheckoutForm from "../CheckoutForm";

export default function Checkout() {
  const { cart } = useContext(CartContext);

  const calculateTotal =()=> {
    return cart.reduce((total, item) => total + item.price,0).toFixed(2);
  }

  return (
    <div className="overflow-x-auto">
      {cart.length === 0 ? (
        "Your Cart is Empty."
      ) : (
        <>
          <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>id</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {cart.map((cartItem, index) => (
              <tr>
                <>
                  <th>{index + 1}</th>
                  <td>{cartItem.title}</td>
                  <td>{cartItem.price}</td>
                </>
              </tr>
            ))}

          </tbody>
        </table>
        <button className="btn btn-primary">Total:{calculateTotal()} </button>

        <CheckoutForm/>
        </>
               
      )}
    </div>
  );
}
