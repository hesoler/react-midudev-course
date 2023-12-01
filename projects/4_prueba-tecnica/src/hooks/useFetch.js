import { useState } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState()
  fetch(url)
    .then(res => res.json())
    .then(data => setData(data))
}
