import ProductList from "./Components/ProductList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProductDetail from "./Components/ProductDetail";
import Cart from "./Components/Cart";
import { useState } from "react";
import "./App.css";
function App() {
  const [cartItems, setCartItems] = useState([]);
  const handleAddToCart = (product) => {
    console.log(product);
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(() =>
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems(() => [...cartItems, { ...product, qty: 1 }]);
    }
  };

  const handleRemoveFromCart = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const handleDeleteFromCart = (product) => {
    setCartItems(cartItems.filter((x) => x.id !== product.id));
  };
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route
            path="/product/:id"
            element={<ProductDetail addToCart={handleAddToCart} />}
          />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
