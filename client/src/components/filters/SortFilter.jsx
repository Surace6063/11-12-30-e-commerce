import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { PiCaretUpDownBold } from "react-icons/pi";
import clsx from "clsx";

const sortOptions = [
  { name: "Newest", value: "-created_at" },
  { name: "Price (high → low)", value: "-price" },
  { name: "Price (low → high)", value: "price" },
];

const SortFilter = ({ selectedSort, setSelectedSort }) => {
  return (
    <Listbox value={selectedSort} onChange={setSelectedSort}>
      <ListboxButton className="border border-gray-300 rounded-md w-full px-3 py-2 text-gray-600 font-medium relative">
        {selectedSort === "-created_at"
          ? "Newest"
          : selectedSort === "price"
          ? "Price (low → high)"
          : "Price (high → low)"}
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
        {sortOptions.map((s) => (
          <ListboxOption
            key={s.value}
            value={s.value}
            className="group flex items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-slate-100 transition cursor-pointer"
          >
            <div className="text-sm text-gray-600">{s.name}</div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};

export default SortFilter;
