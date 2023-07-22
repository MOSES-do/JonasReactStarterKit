import { createContext, useContext } from "react";
import { useEffect, useReducer } from 'react'


const QuizContext = createContext()
const AnswerContext = createContext()
const SECS_PER_QUESTION = 30

function useQuiz() {
    const context = useContext(QuizContext)
    if (context === undefined)
        throw new Error("QuizContext was used outside of QuizProvider")

    return context;
}

function useAnswer() {
    const context = useContext(AnswerContext)
    if (context === undefined)
        throw new Error("AnswerContext was used outside of QuizProvider")

    return context;
}


const initialState = {
    questions: [],
    //loading, error, ready, 'active, finished
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
    chooseNumOfQuestions: 1,
    sortBy: '',
    sortedQuestions: [],
    chosenOptions: []
}

function reducer(state, action) {
    switch (action.type) {

        case 'dataRecieved':
            return {
                ...state,
                questions: action.payload,
                status: 'ready',
            };

        case 'sortedQuestionsArray':
            return {
                ...state,
                sortedQuestions: action.payload,
            }

        case 'selectNumOfQuestions':
            return {
                ...state, chooseNumOfQuestions: action.payload
            }

        case 'setSortBy':
            return { ...state, sortBy: action.payload }

        case 'dataFailed':
            return {
                ...state,
                status: "error"
            }

        case 'start':
            return {
                ...state,
                status: 'active', secondsRemaining: state.chooseNumOfQuestions * SECS_PER_QUESTION,
            }

        case 'restart':
            return {
                ...initialState, questions: state.questions, status: 'ready'
            }

        case 'finished':
            return {
                ...state,
                status: 'finished',
                highscore: state.points > state.highscore ? state.points : state.highscore
            }

        case 'newAnswer':
            const question = state.sortedQuestions.at(state.index)
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? question.points + state.points : state.points
            }


        case 'storedAnswers':
            return {}

        case 'nextQuestion':
            return { ...state, index: state.index + 1, answer: null }

        case 'tick':
            return {
                ...state, secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? 'finished' : state.status
            }

        default:
            throw new Error("Unknown action ")
    }
}



function QuizProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { questions, status, index, answer, points, highscore, secondsRemaining, sortBy, chooseNumOfQuestions, sortedQuestions, chosenOptions } = state

    useEffect(() => {
        fetch("http://localhost:9000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: 'dataRecieved', payload: data }))
            .catch((err) => dispatch({ type: 'dataFailed' }))
    }, [])


    useEffect(() => {
        let sortedItems;
        if (sortBy === '') sortedItems = questions.filter(qn => qn).slice(0, chooseNumOfQuestions);
        if (sortBy === 'easy') sortedItems = questions.filter(qn => qn.easyMode).slice(0, chooseNumOfQuestions);
        if (sortBy === 'difficult') sortedItems = questions.filter(qn => qn.difficultMode).slice(0, chooseNumOfQuestions);
        dispatch({ type: 'sortedQuestionsArray', payload: sortedItems })
    }, [questions, sortBy, chooseNumOfQuestions, answer, dispatch])



    return (
        <>
            <QuizContext.Provider value={{ questions, status, index, points, highscore, secondsRemaining, sortBy, chooseNumOfQuestions, sortedQuestions, chosenOptions, answer, dispatch }}>
                {children}
            </QuizContext.Provider>

            {/* <AnswerContext.Provider value={{ answer }}>
                {children}
            </AnswerContext.Provider> */}
        </>
    )


}

export { QuizProvider, AnswerContext, useQuiz, useAnswer }