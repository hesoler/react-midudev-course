import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import arrowIconPath from './assets/arrows-left-right-bold-svgrepo-com.svg'
import clipboardIconPath from './assets/clipboard-copy-duplicate-paste-svgrepo-com.svg'
import { useEffect } from 'react'

import { AUTO_LANGUAGE } from './constants'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { LanguageSelector } from './components/LanguageSelector'
import { useStore } from './hooks/useStore'
import { translate } from './services/translate'

function App () {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    loading,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  useEffect(() => {
    if (fromText.trim().length === 0) {
      setResult('')
      return
    }
    const time = setTimeout(() => {
      translate({ fromLanguage, toLanguage, fromText })
        .then(newResult => { setResult(newResult as string) })
        .catch(err => { console.log(err) })
    }, 500)

    return () => { clearTimeout(time) }
  }, [fromText, fromLanguage, toLanguage])

  return (
    <div className='app'>
      <Container fluid>
        <h2>Google Translate</h2>
        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.From}
                value={fromLanguage}
                onChange={setFromLanguage}
              />
              <TextArea
                type={SectionType.From}
                loading={loading}
                value={fromText}
                onChange={setFromText}
              />
            </Stack>
          </Col>
          <Col xs='auto'>
            <Button
              variant='link'
              disabled={fromLanguage === AUTO_LANGUAGE}
              onClick={interchangeLanguages}
            >
              <img width='24px' src={arrowIconPath} title='Interchange languages' alt='Interchange icon' />
            </Button>
          </Col>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.To}
                value={toLanguage}
                onChange={setToLanguage}
              />
              <span style={{ position: 'relative' }}>
                <TextArea
                  type={SectionType.To}
                  loading={loading}
                  value={result}
                  onChange={setResult}
                />
                <Button
                  variant='link'
                  style={{ position: 'absolute', left: 0, bottom: 0 }}
                  onClick={handleClipboard}
                >
                  <img width='24px' src={clipboardIconPath} title='Copy to clipboard' alt='Copy icon' />
                </Button>
              </span>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
