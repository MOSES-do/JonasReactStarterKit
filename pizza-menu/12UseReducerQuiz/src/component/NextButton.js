import { useQuiz } from "../hook/QuizContext"


const NextButton = () => {

    const { dispatch, index: curQuestionNum, answer, sortedQuestions: questions } = useQuiz()
    if (answer === null) return null
    // console.log(curQuestionNum + 1, questions.length)
    const handleClick = () => {
        dispatch({ type: "finished" })
    }
    return (
        <>
            {curQuestionNum < questions.length - 1 &&
                <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>NEXT</button>}

            {curQuestionNum + 1 === questions.length && <button className="btn btn-ui" onClick={() => handleClick()}>SUBMIT</button>}
        </>

    )
}

export default NextButton