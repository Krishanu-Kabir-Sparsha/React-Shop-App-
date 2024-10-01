import { Route, Routes } from "react-router-dom";
import Shop from "./Pages/Shop";
import Product from "./Pages/Product";
import Checkout from "./Pages/Checkout";
import NotFound from "./Pages/NotFound";
import Success from "./Pages/Success";
import Category from "./Pages/Category"; // Create this page for category view
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<Success />} />
          <Route path="/:category" element={<Category />} /> {/* Route for category */}
          <Route path="*" element={<NotFound />} />
      </Routes>  
    </>
  );
}

export default App;
