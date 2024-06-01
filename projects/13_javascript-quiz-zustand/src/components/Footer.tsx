import { Button } from '@mui/material'
import { useQuestionsData } from '../hooks/useQuestionsData'
import { useQuestionsStore } from '../store/question'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsStore(state => state.reset)

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>
        {`✅  ${correct} correctas - ❌  ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}
      </strong>
      <div style={{ marginTop: '16px' }}>
        <Button variant='outlined' color='warning' onClick={() => { reset() }}>
          Reiniciar juego
        </Button>
      </div>
    </footer>
  )
}
