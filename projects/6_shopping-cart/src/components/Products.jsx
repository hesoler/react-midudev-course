import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import PropTypes from 'prop-types'
import { useCart } from '../hooks/useCart'

export function Products ({ products }) {
  const { addToCart, cart, removeFromCart } = useCart()

  const checkProductInCart = product => cart.some(item => item.id === product.id)

  return (
    <main className='products'>
      <ul>
        {products.slice(0, 10).map(product => {
          const isProductsInCart = checkProductInCart(product)
          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <b>{product.title}</b> - ${product.price}
              </div>
              <button
                style={{ backgroundColor: isProductsInCart ? 'red' : 'blue' }}
                onClick={() => {
                  isProductsInCart ? removeFromCart(product) : addToCart(product)
                }}
              >
                {isProductsInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
              </button>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

Products.propTypes = { products: PropTypes.array.isRequired }
