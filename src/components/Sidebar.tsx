import type { Products } from "../types";

const Sidebar = ({ products }: Products) => {
  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  );
  const keywords = ["apple", "watch", "Fashion", "trend", "shoes", "shirt"];

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">Shop Products</h1>

      {/* ==== Sidebar ==== */}
      <section>
        {/* == Search && Min & Max price inputs == */}
        <input
          className="border-2 rounded px-2 sm:mb-0"
          type="text"
          placeholder="Search Product"
          name="search"
        />
        <div className="flex justify-center items-center">
          <input
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            type="text"
            placeholder="Min"
            name="min"
          />
          <input
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            type="text"
            placeholder="Max"
            name="max"
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
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <button className="w-full mb-16 mt-5 border rounded bg-black text-white py-2">
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
