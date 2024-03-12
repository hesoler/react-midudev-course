import { createContext, useReducer } from 'react'
import { cartInitialState, cartReducer } from '../reducers/cart'
import PropTypes from 'prop-types'

export const CartContext = createContext()

export function useCartReducer () {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = product => dispatch({ type: 'ADD_TO_CART', payload: product })
  const removeFromCart = product => dispatch({ type: 'REMOVE_FROM_CART', payload: product })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return { state, addToCart, removeFromCart, clearCart }
}

export function CartProvider ({ children }) {
  const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

  return (
    <CartContext.Provider value={{ cart: state, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
}
