import styled from "styled-components";
import Product from "./Product";
import { popularProducts } from "../data";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products${cat ? `?category=${cat}` : ""}`
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      Object.entries(filters).every(([key, value]) =>
        product[key].includes(value)
      )
    );
    cat && setFilteredProducts(filtered);
  }, [products, filters, cat]);

  return (
    <Container>
      {filteredProducts.map((item) => (
        <Product key={item.id} item={item} />
      ))}
    </Container>
  );
};

export default Products;
