import { memo } from 'react'
import { useQuiz } from '../hook/QuizContext'

const ProgressBar = () => {
    const { points: totalPointsAcquired, sortedQuestions, answer, index: curQuestionNum } = useQuiz()

    const numQuestions = sortedQuestions.length
    const totalPoints = sortedQuestions.reduce((prev, cur) => prev + cur.points, 0)

    // const currentQuestion = answer === null ? indexOf(numQuestions) + 1 : ''
    return (
        <header className="progress">

            <progress style={{ borderRadius: "20px" }} max={numQuestions} value={curQuestionNum + Number(answer !== null)} />

            <p>  {`Question ${curQuestionNum + 1}/${numQuestions}`} </p>

            <p>{totalPointsAcquired} / {totalPoints} points</p >
        </header>
    )
}

export default memo(ProgressBar)