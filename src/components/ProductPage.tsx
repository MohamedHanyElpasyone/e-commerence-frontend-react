import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../types";
import axios from "axios";

interface ParamsType {
  id?: string | undefined;
  [key: string]: string | undefined;
}

const ProductPage = () => {
  const { id } = useParams<ParamsType>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error(`Error fetching product data: ${error}`);
        });
    }
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-5 w-3/5">
      <button
        className="mb-5 px-4 py-2 bg-black text-white rounded"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <img className="w-1/2 h-auto mb-5" src={product.thumbnail} alt={product.title} />
      <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
      <p className="mb-4 text-gray-700 w-7/10">{product.description}</p>
      <div className="flex">
        <p>Price: ${product.price}</p>
        <p className="ml-10">Rating: {product.rating}</p>
      </div>
    </div>
  );
};

export default ProductPage;
