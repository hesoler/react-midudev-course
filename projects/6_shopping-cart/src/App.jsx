import { Cart } from './components/Cart'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Products } from './components/Products'
import { IS_DEVELOPMENT } from './config'
import { CartProvider } from './context/cartContext'
import { useFilter } from './hooks/useFilter'
import { products as initialProducts } from './mocks/products.json'

function App () {
  const { filterProducts, setFilters } = useFilter()
  const filteredProducts = filterProducts(initialProducts)

  return (
    <CartProvider>
      <Header changeFilters={setFilters} />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  )
}

export default App
