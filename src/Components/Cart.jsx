import "./cart.css";
const Cart = ({ cartItems }) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in your cart yet.</p>
      ) : (
        <div className="cart-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="item-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <div className="quantity-control">
                  <input type="button" value="-" />
                  <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                  <input type="button" value="+" />
                </div>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          {/* <h3>Total: ${total.toFixed(2)}</h3> */}
        </div>
      )}
    </div>
  );
};

export default Cart;
