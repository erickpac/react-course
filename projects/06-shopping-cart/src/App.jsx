import { Products } from "./components/Products";
import { Header } from "./components/Header";
import { products as initialProducts } from "./mocks/products";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { useFilters } from "./hooks/userFilters";
import { CartProvider } from "./context/cart";

function App() {
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(initialProducts);

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      <Footer />
    </CartProvider>
  );
}

export default App;
