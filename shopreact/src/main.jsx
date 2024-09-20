import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './assets/context/cartContext.jsx'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe("pk_test_51PunIX08sFiNP2qR84rGVLZ5e5cmE0rDJfqdeGDExZGILG6o5wCJb5V6E0oci39FjfMCdDoWT0e97DuRIahij4tu00dddCgVqg");




createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <CartProvider>
          <Elements stripe={stripePromise}> 
              <BrowserRouter>
                  <App />
              </BrowserRouter>
          </Elements>
      </CartProvider>
      
  </StrictMode>,
)
