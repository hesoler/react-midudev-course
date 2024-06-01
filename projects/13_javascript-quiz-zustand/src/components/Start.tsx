import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/question'

export const Start = () => {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(5)
  }
  return (
    <Button variant='contained' onClick={handleClick}>
      Start!
    </Button>
  )
}
