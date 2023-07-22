import React from 'react'

const FinishedScreen = ({ totalPointsAcquired, totalPossiblePoints, highscore, dispatch }) => {
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