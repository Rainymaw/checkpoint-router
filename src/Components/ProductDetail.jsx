import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./productDetail.css";

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the product", error);
        setLoading(false);
      }
    };

    const fetchSimilarProducts = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/category/${product?.category}`
        );
        setSimilarProducts(response.data.filter((p) => p.id !== parseInt(id)));
      } catch (error) {
        console.error("Error fetching similar products", error);
      }
    };

    fetchProduct();
    if (product) {
      fetchSimilarProducts();
    }
  }, [id, product]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-details">
      {product && (
        <>
          <div className="product-details-main">
            <img src={product.image} alt={product.title} />
            <div className="product-info">
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>
                Rating: {product.rating.rate} ({product.rating.count} reviews)
              </p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
          <div className="similar-products">
            <h2>Similar Products</h2>
            <div className="similar-products-list">
              {similarProducts.map((similarProduct) => (
                <div key={similarProduct.id} className="similar-product-card">
                  <img src={similarProduct.image} alt={similarProduct.title} />
                  <p>{similarProduct.title}</p>
                  <p>${similarProduct.price}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
