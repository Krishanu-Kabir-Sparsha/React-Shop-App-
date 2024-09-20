import {useStripe, useElements, PaymentElement, CardElement} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentCompleted, setPaymentCompleted] = useState (false);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type:"card",
        card: cardElement,
    });

    // const result = await stripe.confirmPayment({
    //   //`Elements` instance that was used to create the Payment Element
    //   elements,
    //   confirmParams: {
    //     return_url: "https://example.com/order/123/complete",
    //   },
    // });

    if (error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      console.log("Done", paymentMethod);
    }
  };

  return (
    <form className='max-w-lg mx-auto bg-white shadow-md rounded-lg p-8' onSubmit={handleSubmit}>
      {/* <PaymentElement /> */}
      <CardElement className='p-4 w-[400px]' />
      <button className='btn btn-success' disabled={!stripe}>
        {paymentCompleted ? "Success" : "Pay"}
      </button>
    </form>
  )
};

export default CheckoutForm;