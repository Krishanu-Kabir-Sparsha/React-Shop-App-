import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error.message);
    } else {
      console.log("Payment successful", paymentMethod);
      setPaymentCompleted(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Payment Information
      </h3>
      <div className="bg-gray-100 p-4 border border-gray-300 rounded-lg mb-6">
        <CardElement />
      </div>
      <button
        className={`w-full py-3 rounded-md font-medium text-white ${paymentCompleted ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
        disabled={!stripe}
      >
        {paymentCompleted ? "Payment Successful" : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
