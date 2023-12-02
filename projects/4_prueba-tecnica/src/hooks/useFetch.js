import { useEffect, useState } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState()

  const getFetch = () => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setData(data)
      })
  }

  useEffect(() => {
    if (!url) return
    getFetch()
  }, [url])

  return data
}
