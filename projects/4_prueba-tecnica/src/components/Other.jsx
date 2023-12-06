import React from 'react'
import { useCatImage } from '../hooks/useCatImage'

export default function Other () {
  const { imageUrl } = useCatImage({ fact: 'cat' })
  return (
    <>
      {imageUrl && <img src={imageUrl} />}
    </>
  )
}
