import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import useProducts from "./hooks/useProducts";
import MainContent from "./components/MainContent";

const App = () => {
  const { products } = useProducts();

  return (
    <div className="flex h-screen">
      <Sidebar products={products} />
      <div className="w-full flex justify-between flex-wrap">
        <Routes>
          <Route path="/" element={<MainContent />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
