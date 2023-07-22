import React, { useEffect, useState } from 'react'
import { useQuiz } from '../hook/QuizContext'


const QuizMode = ({ sortBy, dispatch, disabled }) => {
    return (
        <div>
            <select className="drop" value={sortBy} onChange={(e) => dispatch({ type: 'setSortBy', payload: e.target.value })} disabled={disabled}>
                <option value="">Choose difficulty</option>
                <option value="easy">Easy</option>
                <option value="difficult">Difficult</option>
            </select>
        </div>
    )
}


const StartScreen = () => {

    const { chooseNumOfQuestions, sortBy, dispatch } = useQuiz()

    const [questions, setQuestions] = useState([])
    const [active, setActive] = useState('b')
    const numOfQuestions = questions.length;
    const activeBtn = active === 'a'

    const disabled = chooseNumOfQuestions === questions.length;


    useEffect(() => {
        fetch("http://localhost:9000/questions")
            .then((res) => res.json())
            .then((data) => setQuestions(data))
            .catch((err) => dispatch({ type: 'dataFailed' }))
    }, [dispatch, setQuestions])

    const handleBtnActive = () => {
        dispatch({ type: "start" })
    }

    const Arr = Array.from({ length: numOfQuestions }, (_, i) => i + 1);

    const selectStyle = {
        width: '150px',
        height: '30px',
        border: '1px solid #1c87c9',
        fontSize: '12px',
        backgroundColor: '#eee',
        borderRadius: "5px",
        marginTop: "-20px",
        paddingLeft: "10px"
    }

    function handleOnChange(e) {
        dispatch({ type: 'selectNumOfQuestions', payload: Number(e.target.value) })
    }

    return (
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{questions.length} question to test your React mastery</h3>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "15px", alignItems: "center" }}>
                <select style={selectStyle} onChange={handleOnChange} >
                    <option>Select number of questions:</option>
                    {Arr.map((num, i) => {
                        return <option onClick={() => setActive('a')
                        } value={num} key={num}>
                            {num}
                        </option>
                    })}
                </select>

                <QuizMode sortBy={sortBy} dispatch={dispatch} disabled={disabled} />
            </div>
            <button disabled={!activeBtn} style={{ marginTop: '30px' }} className="btn btn-ui" onClick={() => handleBtnActive()}>Let's start</button>
        </div >
    )
}

export default StartScreen