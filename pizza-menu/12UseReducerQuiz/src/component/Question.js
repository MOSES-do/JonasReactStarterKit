import { memo, useMemo, useCallback } from 'react'
import Options from './Options'
import { useQuiz } from '../hook/QuizContext'


const Question = () => {

    const { index, sortedQuestions, dispatch, answer } = useQuiz()

    const question = useMemo(() => sortedQuestions[index], [index, sortedQuestions])

    // shuffle array of answers

    const shuffle = useCallback(function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        const qn = question;
        const inNum = index;
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        console.log("recreated")
        return array;
    }, [question, index])


    return (
        <div>
            <h4>{question?.question}</h4>

            <div className="options">
                <Options question={question} shuffle={shuffle} dispatch={dispatch} answer={answer} />
            </div>

            {/* <button onClick={() => dispatch({ type: 'prevQuestion' })}>previous</button> */}
        </div>
    )
}



export default memo(Question)