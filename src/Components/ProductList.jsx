import { useState, useEffect, useRef } from "react";
import "./product.css";
import axios from "axios";
import ProductItem from "./ProductItem";
function ProductList() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [sortOption, setSortOption] = useState("");
  const [url, setUrl] = useState("https://fakestoreapi.com/products");

  const getProducts = async () => {
    try {
      const response = await axios.get(url);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log("error, there is a wrong thing here");
      setLoading(false);
    }
  };
  const getCategories = async () => {
    try {
      const response = await axios.get(url + "/categories");
      setCategories(response.data);
    } catch {
      console.log("error, no category found");
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getFilteredAndSortedProducts = () => {
    let filteredProducts = selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;

    if (sortOption === "price-asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return filteredProducts;
  };
  const finalProducts = getFilteredAndSortedProducts();
  if (loading) {
    return <p>...Loading</p>;
  }
  return (
    <>
      <div className="category">
        <input
          type="button"
          className="category-btn"
          value="All"
          onClick={() => {
            setSelectedCategory("");
          }}
        />
        {categories.map((category) => (
          <input
            className="category-btn"
            type="button"
            key={category}
            value={category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>
      <div className="sorting-container">
        <label>Sort By: </label>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Select</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="product-grid">
        {finalProducts &&
          finalProducts.map((product, index) => (
            <ProductItem product={product} key={index} />
          ))}
      </div>
    </>
  );
}

export default ProductList;
