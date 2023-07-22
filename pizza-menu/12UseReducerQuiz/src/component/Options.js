import { memo } from "react";

function Options({ question, shuffle, index, dispatch, answer }) {


    const hasAnswered = answer !== null


    const handleAnswerCheck = (option) => {
        dispatch({ type: 'newAnswer', payload: option })
    }

    const options = shuffle(question?.options)

    return (
        options.map((option, index) =>
            <button onClick={() => handleAnswerCheck(option)} key={option} className={`btn btn-option
            ${option === answer ? 'answer' : ''}
            ${hasAnswered ? option === question.correctOption ? 'correct' : 'wrong' : ''}
            `
            }
                disabled={hasAnswered}
            >
                {option}
            </button>
        )
    )
}

export default memo(Options)