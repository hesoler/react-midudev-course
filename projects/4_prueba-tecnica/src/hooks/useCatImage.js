import { useEffect, useState } from 'react'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/says/'
// const parametersUrl = '?size=50&color=red&json=true'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ')
    fetch(CAT_PREFIX_IMAGE_URL + threeFirstWords)
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
      .catch(err => console.log(err))
  }, [fact])

  return { imageUrl }
}
