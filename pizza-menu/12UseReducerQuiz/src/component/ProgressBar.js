import { memo } from 'react'


const ProgressBar = ({ numQuestions, curQuestionNum, totalPossiblePoints, answer, totalPointsAcquired }) => {
    // const currentQuestion = answer === null ? indexOf(numQuestions) + 1 : ''
    return (
        <header className="progress">

            <progress style={{ borderRadius: "20px" }} max={numQuestions} value={curQuestionNum + Number(answer !== null)} />

            <p>  {`Question ${curQuestionNum + 1}/${numQuestions}`} </p>

            <p>{totalPointsAcquired} / {totalPossiblePoints} points</p >
        </header>
    )
}

export default memo(ProgressBar)