import { useEffect, useState } from "react";
import type { Data, Product } from "../types";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: Data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchProducts();
  }, []);

  return { products };
};

export default useProducts;
