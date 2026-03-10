import { useState } from "react";
import { useFilter } from "../context/FilterContext";
import { Tally3 } from "lucide-react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";
import useFilteredProducts from "../hooks/useFilteredProducts";

const MainContent = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { filter, setFilter, currentPage, setCurrentPage, itemsPerPage } =
    useFilter();
  const { filteredProducts } = useFilteredProducts();

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1) {
      endPage = Math.min(totalPages, currentPage + 2);
    }
    if (currentPage === totalPages) {
      startPage = Math.max(1, currentPage - 2);
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  return (
    <section className="p-5 sm:w-100 lg:w-195  2xl:w-300 xl:w-250 md:w-160">
      <div className="mb-5">
        {/* == Filter button == */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button
              className="border px-4 py-2 rounded-full flex items-center"
              onClick={() => setDropDownOpen(!dropDownOpen)}
            >
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "Filter"
                : filter[0].toLowerCase() + filter.slice(1)}
            </button>
            {dropDownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  onClick={() => setFilter("cheap")}
                >
                  Cheap
                </button>
                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  onClick={() => setFilter("expensive")}
                >
                  Expensive
                </button>
                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  onClick={() => setFilter("popular")}
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
        {/* == ProductCard == */}
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-1 sm:gap-5">
          {filteredProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
          {/* == previous == */}
          <button
            className="border px-4 py-2 rounded-full mx-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* == 1,2,3,4,5 == */}
          <div className="flex justify-center">
            {getPaginationButtons().map((page) => (
              <button
                className={`border px-4 py-2 mx-1 rounded-full ${currentPage === page ? "bg-black text-white" : ""}`}
                key={page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>

          {/* == next == */}
          <button
            className="border px-4 py-2 rounded-full mx-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
