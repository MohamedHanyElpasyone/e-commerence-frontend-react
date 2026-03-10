import { useFilter } from "../context/FilterContext";
import type { Products } from "../types";

const Sidebar = ({ products }: Products) => {
  //  Categories & Keywords
  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  );
  const keywords = ["apple", "watch", "Fashion", "trend", "shoes", "shirt"];

  // FilterTools
  const {
    searchQuery,
    setSearchQuery,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedCategory,
    setSelectedCategory,
    setKeyword,
  } = useFilter();

  // HandleFunctions
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setMinPrice(isNaN(value) ? "" : value);
  };
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setMaxPrice(isNaN(value) ? "" : value);
  };
  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };
  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };
  const handleResetFilters = () => {
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("");
    setKeyword("");
  };

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">Shop Products</h1>

      {/* ==== Sidebar ==== */}
      <section className="w-[inherit]">
        {/* == Search && Min & Max price inputs == */}
        <input
          className="border-2 rounded px-2 sm:mb-0 py-3 w-full"
          type="text"
          placeholder="Search Product"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex justify-center items-center mt-3">
          <input
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            type="text"
            placeholder="Min"
            name="min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            type="text"
            placeholder="Max"
            name="max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* == Categories == */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
        </div>
        <section>
          {categories.map((category) => (
            <label className="block mb-2" key={category}>
              <input
                className="mr-2 w-4 h-4"
                type="radio"
                name="category"
                value={category}
                onChange={() => handleRadioChangeCategories(category)}
                checked={selectedCategory === category}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>

        {/* == Keywords == */}
        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
          <div>
            {keywords.map((keyword) => (
              <button
                className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
                key={keyword}
                onClick={() => handleKeywordClick(keyword)}
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <button
          className="w-full mb-16 mt-5 border rounded bg-black text-white py-2"
          onClick={() => handleResetFilters()}
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
