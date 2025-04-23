import React, { useState, useEffect } from 'react';
import './inventory.css';
import { Link} from "react-router-dom";



const Inventory = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setOriginalProducts(data);   // Save original
        setProducts(data);           // Show it initially
      });
  }, []);

  useEffect(() => {
    if (sortOption === "") {
      setProducts(originalProducts);  // Reset to original when no sort
    } else {
      setProducts(sortProducts([...originalProducts], sortOption));
    }
  }, [sortOption, originalProducts]);
  // Load cart from localStorage
useEffect(() => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    setCart(JSON.parse(storedCart));
  }
}, []);

// Save cart to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  const sortProducts = (products, option) => {
    switch (option) {
      case "price-asc":
        return products.sort((a, b) => a.price - b.price);
      case "price-desc":
        return products.sort((a, b) => b.price - a.price);
      case "name-asc":
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return products.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return products;
    }
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="inventory-container">
      <div className='inventory-Head'>
        <input className='srch-Input' placeholder='Search Your Item' />
        <p className="cart-count">🛒 Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)} items</p>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="sort-select"
        >
          <option value="">Sort: By</option>
          <option value="name-asc">A to Z</option>
          <option value="name-desc">Z to A</option>
          <option value="price-asc"> Price Low-High</option>
          <option value="price-desc"> Price High-Low</option>
        </select>

        <Link to={`/invoice`}>
          <button className="go-btn" >
            Go to Cart
          </button>
        </Link>
      </div>
      <br />
      <div className="product-list">
        {products.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);

          return (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />

              <div className="product-info">
                <strong>{product.title}</strong>
                <p>₹ {product.price}</p>
                <small>{product.description}</small>
              </div>

              {!cartItem ? (
                <button className="add-btn" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              ) : (
                <div className="qty-control">
                  <button onClick={() => decreaseQty(product.id)}>-</button>
                  <span>{cartItem.quantity}</span>
                  <button onClick={() => increaseQty(product.id)}>+</button>
                </div>
              )}
            </div>

          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
