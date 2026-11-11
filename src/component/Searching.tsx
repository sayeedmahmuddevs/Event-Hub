
"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface EventSearchProps {
  onSearch: (value: string) => void;
  onCategoryChange?: (value: string) => void;
}

const categories = [
  { label: "All Events", value: "all" },
  { label: "Winter Clothing", value: "winter-clothing" },
  { label: "Food Donation", value: "food-donation" },
  { label: "Volunteer", value: "volunteer" },
  { label: "Fundraising", value: "fundraising" },
  { label: "Community", value: "community" },
  { label: "Other", value: "other" },
];

export default function EventSearch({
  onSearch,
  onCategoryChange,
}: EventSearchProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const router = useRouter();

  const handleCategory = (value: string) => {
    setActiveCategory(value);
    onCategoryChange?.(value);
  };

  return (
    <div className="sticky top-0 z-40 w-full border-b bg-white/95 px-4 backdrop-blur-md dark:bg-gray-800/95 sm:px-8 lg:px-20">

      {/* Search and Create */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 py-3">

        <div className="relative max-w-2xl flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            type="search"
            placeholder="Search events..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onSearch(e.target.value);
            }}
            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm outline-none transition focus:border-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:bg-gray-800"
          />
        </div>

        <button
          onClick={() => router.push("/events/create")}
          className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-violet-600 px-4 font-semibold text-white transition hover:bg-violet-700"
        >
          <Plus size={19} />
          <span className="hidden sm:inline">Create Event</span>
          <span className="sm:hidden">Create</span>
        </button>
      </div>

      {/* Category Navbar */}
      <div className="mx-auto max-w-7xl overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max items-center gap-2 pb-3">

          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategory(category.value)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                activeCategory === category.value
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-violet-100 hover:text-violet-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {category.label}
            </button>
          ))}

        </div>
      </div>
    </div>
  );
}
