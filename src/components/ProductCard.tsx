import { Link } from "react-router-dom";

interface ProductCard {
  id: number;
  title: string;
  image: string;
  price: number;
}

const ProductCard = ({ id, title, image, price }: ProductCard) => {
  return (
    <div className="border p-4 rounded min-w-fit">
      <Link to={`/products/${id}`}>
        <img className="w-full h-32 object-cover" src={image} alt={`Error loading image of product "${title}"`} />
        <h2 className="font-bold">{title}</h2>
        <p>${price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
