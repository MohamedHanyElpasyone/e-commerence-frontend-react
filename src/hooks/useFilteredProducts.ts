import { useState, useEffect } from "react";
import { useFilter } from "../context/FilterContext";
import axios from "axios";
import type { Product } from "../types";

const useFilteredProducts = () => {
  const {
    searchQuery,
    minPrice,
    maxPrice,
    selectedCategory,
    keyword,
    filter,
    currentPage,
    itemsPerPage,
  } = useFilter();  
  const skip = (currentPage - 1) * itemsPerPage;
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, [keyword, currentPage, itemsPerPage]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product: Product) => product.category === selectedCategory,
      );
    }

    if (minPrice != "") {
      filteredProducts = filteredProducts.filter(
        (product: Product) => product.price >= Number(minPrice),
      );
    }

    if (maxPrice != "") {
      filteredProducts = filteredProducts.filter(
        (product: Product) => product.price <= Number(maxPrice),
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product: Product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    switch (filter) {
      case "expensive":
        return filteredProducts.sort(
          (a: Product, b: Product) => b.price - a.price,
        );
      case "cheap":
        return filteredProducts.sort(
          (a: Product, b: Product) => a.price - b.price,
        );
      case "popular":
        return filteredProducts.sort(
          (a: Product, b: Product) => b.rating - a.rating,
        );
      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts();

  return { filteredProducts };
};

export default useFilteredProducts;
