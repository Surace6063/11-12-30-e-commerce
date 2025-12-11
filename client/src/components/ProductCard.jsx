import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <Link to={`/products/${item.slug}/${item.id}`}>
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white w-full">
        <img
          src={item.image}
          alt={item.title}
          className="aspect-square object-cover w-full"
        />

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 line-clamp-1 mb-1">
            {item.title}
          </h3>

          <p className="text-gray-500 text-sm line-clamp-2 mb-3">
            {item.description}
          </p>

          <p className="text-lg font-bold text-primary">${item.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
