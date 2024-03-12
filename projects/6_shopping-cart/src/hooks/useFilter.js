import { useContext } from 'react'
import { FiltersContext } from '../context/filtersContext'

export function useFilter () {
  const { filters, setFilters } = useContext(FiltersContext)

  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === 'all' || product.category === filters.category)
      )
    })
  }

  return { filters, filterProducts, setFilters }
}
