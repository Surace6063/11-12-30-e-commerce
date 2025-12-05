import { PiCaretUpDownBold } from "react-icons/pi";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { useCategories } from "../../api/category-services";

const CategoryFilter = ({category,setCategory}) => {
  // fetching categories
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useCategories();

  return (
    <Listbox value={category} onChange={setCategory}>
      <ListboxButton className="border border-gray-300 rounded-md w-full px-3 py-2 text-gray-600 font-medium relative">
        {category === "" ? "All" : category}
        <PiCaretUpDownBold className="group pointer-events-none absolute top-2.5 right-2.5 size-4" />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "w-(--button-width) rounded-xl border border-gray-300 shadow bg-white p-1 [--anchor-gap:--spacing(1)] focus:outline-none",
          "transition duration-100 ease-in data-leave:data-closed:opacity-0"
        )}
      >
        <ListboxOption
          value=""
          className="group flex items-center gap-2 rounded-lg px-3 py-1.5  hover:bg-slate-100 transition cursor-pointer"
        >
          All
        </ListboxOption>
        {categories?.map((cat) => (
          <ListboxOption
            key={cat.name}
            value={cat.name}
            className="group flex items-center gap-2 rounded-lg px-3 py-1.5  hover:bg-slate-100 transition cursor-pointer"
          >
            {/* <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" /> */}
            <div className="text-sm/6 text-gray-600">{cat.name}</div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
export default CategoryFilter;
