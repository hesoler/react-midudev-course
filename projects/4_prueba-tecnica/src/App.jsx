import { useEffect, useState } from 'react'
import './App.css'
import { useFetch } from './hooks/useFetch'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/says/'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState('')

  // efecto para recuperar la cita al cargar la página
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  // efecto para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ')
    console.log(threeFirstWords)
    setImageUrl(threeFirstWords)
    fetch(`${CAT_PREFIX_IMAGE_URL}${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        console.log(response)
        console.log(url)
      })
  }, [])

  return (
    <main>
      <h1>App de gatos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={CAT_PREFIX_IMAGE_URL + imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
    </main>
  )
}
