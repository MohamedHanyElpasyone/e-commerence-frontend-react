import Sidebar from "./components/Sidebar";
import useProducts from "./hooks/useProducts";

const App = () => {
  const { products } = useProducts();

  return (
    <div className="flex h-screen">
      <Sidebar products={products} />
    </div>
  );
};

export default App;
