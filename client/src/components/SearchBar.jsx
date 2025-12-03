
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 gap-1.5">
        <CiSearch size={22} className="text-gray-500 hover:text-gray-800 cursor-pointer transition" />
        <input className="focus:outline-0 placeholder:text-xs text-gray-500 text-sm" type="text" placeholder="what are you looking for..." />
    </div>
  )
}
export default SearchBar