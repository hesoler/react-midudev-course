import { type FromLanguage, type Language } from '../types'

interface Props {
  fromText: string
  fromLanguage: FromLanguage
  toLanguage: Language
}

export async function translate ({ fromText, fromLanguage, toLanguage }: Props) {
  const baseURL = 'https://api.mymemory.translated.net/get?q='
  const apiURL = `${baseURL}${fromText.trim()}&langpair=${fromLanguage}|${toLanguage}`

  const response = await fetch(apiURL)
  const data = await response.json()
  return data.responseStatus === 200 ? data.responseData.translatedText : ''
}
