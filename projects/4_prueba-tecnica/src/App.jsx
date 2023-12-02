import { useEffect, useState } from 'react'
import './App.css'
import { useFetch } from './hooks/useFetch'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/says/'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState('')
  const fetchCat = useFetch(CAT_ENDPOINT_RANDOM_FACT)

  useEffect(() => {
    if (!fetchCat) return
    const { fact } = fetchCat
    setFact(fact)
    const threeFirstWords = fact.split(' ', 3).join(' ')
    console.log(threeFirstWords)
    setImageUrl(CAT_PREFIX_IMAGE_URL + threeFirstWords)
  }, [fetchCat])

  return (
    <main>
      <h1>App de gatos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
    </main>
  )
}
