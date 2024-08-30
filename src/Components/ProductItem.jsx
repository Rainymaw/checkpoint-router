import "./product.css";
import { Link } from "react-router-dom";
function ProductItem({ product }) {
  return (
    <div key={product.id} className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-img-container">
          <img
            className="product-img"
            src={product.image}
            alt={product.title}
          />
        </div>
      </Link>

      <h2 className="product-title">{product.title}</h2>
      <p className="product-price"> ${product.price}</p>
      <p className="product-rating">
        Rating: {product.rating.rate} ({product.rating.count} reviews)
      </p>
    </div>
  );
}

export default ProductItem;
