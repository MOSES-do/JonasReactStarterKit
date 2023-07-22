import { memo } from 'react'
import Options from './Options'


const Question = ({ question, dispatch, answer }) => {
    // console.log(question)


    return (
        <div>
            <h4>{question?.question}</h4>

            <div className="options">
                <Options question={question} dispatch={dispatch} answer={answer} />
            </div>

            {/* <button onClick={() => dispatch({ type: 'prevQuestion' })}>previous</button> */}
        </div>
    )
}



export default memo(Question)