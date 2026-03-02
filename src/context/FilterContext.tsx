import { createContext, useContext, useState, type ReactNode } from "react";

interface FilterProviderProps {
  children: ReactNode;
}

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  minPrice: number |  string;
  setMinPrice: (price: number | string) => void;
  maxPrice: number | string;
  setMaxPrice: (price: number | string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  keyword: string;
  setKeyword: (Keyword: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [keyword, setKeyword] = useState("");

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        selectedCategory,
        setSelectedCategory,
        keyword,
        setKeyword,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext)

  if (context === undefined){
    throw new Error("useFilter must be used with a FilterProvider")
  }

  return context;
};
