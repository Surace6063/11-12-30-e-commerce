import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  const [searchValue, setSerachValue] = useState("");

  // reidrect user to products page -> http://localhost:3000/products/?search=searchVlaue
  const handleSearch = (e) => {
    e.preventDefault()

    navigate(`/products/?search=${searchValue}`)
  }

  return (
    <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 gap-1.5">
      <CiSearch
        onClick={handleSearch}
        size={22}
        className="text-gray-500 hover:text-gray-800 cursor-pointer transition"
      />
     <form onSubmit={handleSearch}>
         <input
        onChange={(e) => setSerachValue(e.target.value)}
        value={searchValue}
        className="focus:outline-0 placeholder:text-xs text-gray-500 text-sm"
        type="text"
        placeholder="what are you looking for..."
      />
     </form>
    </div>
  );
};
export default SearchBar;
