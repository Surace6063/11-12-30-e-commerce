import { useProducts } from "../api/product-services";
import MaxWidthContainer from "../components/MaxWidthContainer";
import ProductCard from "../components/ProductCard";
import { PiCaretUpDownBold } from "react-icons/pi"

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";

const people = [
  { id: 1, name: "Tom Cook" },
  { id: 2, name: "Wade Cooper" },
  { id: 3, name: "Tanya Fox" },
  { id: 4, name: "Arlene Mccoy" },
  { id: 5, name: "Devon Webb" },
];

const ProductPage = () => {
  const [selected, setSelected] = useState(people[1]);

  // fetching products
  const { data: products, isLoading, isError, error } = useProducts({});

  return (
    <MaxWidthContainer className="my-16">
      <div className="flex gap-10">
        {/* filter */}
        <div
          className="border border-gray-200 shadow-sm rounded-xl 
          basis-[25%] h-fit p-4"
        >
          <h1 className="text-gray-800 font-semibold mb-4 text-2xl">Filters</h1>

          {/* category filter */}
          <h3 className="text-gray-600 font-medium mb-2">category</h3>
          <Listbox value={selected} onChange={setSelected}>
            <ListboxButton
              className="border border-gray-300 rounded-md w-full px-3 py-2 text-gray-600 font-medium relative"
            >
              {selected.name}
              <PiCaretUpDownBold
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4"
              />
            </ListboxButton>
            <ListboxOptions
              anchor="bottom"
              transition
              className={clsx(
                "w-(--button-width) rounded-xl border border-gray-300 shadow bg-white p-1 [--anchor-gap:--spacing(1)] focus:outline-none",
                "transition duration-100 ease-in data-leave:data-closed:opacity-0"
              )}
            >
              {people.map((person) => (
                <ListboxOption
                  key={person.name}
                  value={person}
                  className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                >
                  {/* <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" /> */}
                  <div className="text-sm/6 text-gray-600">{person.name}</div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>

        {/* product list */}
        <div className="basis-[75%]">
          {/* product list header and pagination */}
          <div className="flex justify-between items-center">
            <h1 className="text-gray-800 text-xl font-semibold">Products</h1>
            <div>pagination</div>
          </div>

          {/* divider */}
          <div className="border-b border-gray-300 my-6" />

          {/* products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading ? (
              "loading..."
            ) : isError ? (
              <p>{error.message}</p>
            ) : products.results.length === 0 ? (
              "No items found"
            ) : (
              products.results.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))
            )}
          </div>
        </div>
      </div>
    </MaxWidthContainer>
  );
};
export default ProductPage;
