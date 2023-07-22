import React from 'react'
import { useQuiz } from '../hook/QuizContext'


const FinishedScreen = () => {
    const { points: totalPointsAcquired, highscore, dispatch, sortedQuestions } = useQuiz()

    const totalPossiblePoints = sortedQuestions.reduce((prev, cur) => prev + cur.points, 0)

    const percentage = (totalPointsAcquired / totalPossiblePoints) * 100

    let emoji;
    if (percentage === 100) emoji = '🏅'
    if (percentage >= 80 && percentage < 100) emoji = '🫡'
    if (percentage >= 50 && percentage < 80) emoji = '🤓'
    if (percentage >= 0 && percentage < 50) emoji = '🤔'
    if (percentage === 0) emoji = '🤦'

    return (
        <>
            <p className='result'>You scored <strong>{totalPointsAcquired}</strong> out of {totalPossiblePoints}{" "}
                ({Math.ceil(percentage)})%
                {emoji}</p>

            <div className="highscore">(Highscore: {highscore} points)</div>

            <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>Start Again!</button>
        </>
    )
}

export default FinishedScreen