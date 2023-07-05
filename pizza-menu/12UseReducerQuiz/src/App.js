import './App.css';
import { useReducer, useEffect } from 'react'
import { Header, Main, Loader, Error, FinishedScreen, StartScreen, Question, NextButton, ProgressBar, Footer, Timer } from './component/index'

const SECS_PER_QUESTION = 30

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
  sortedQuestions: []
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

function App() {
  // const [{questions, status}, dispatch] = useReducer(reducer, initialState)
  const [state, dispatch] = useReducer(reducer, initialState)
  const { questions, status, index, answer, points, highscore, secondsRemaining, sortBy, chooseNumOfQuestions, sortedQuestions } = state

  console.log(sortedQuestions.map(question => question.selectedAnswer))
  useEffect(() => {
    if (status === 'active' || status === 'finished') {
      window.onbeforeunload = () => {
        return 'Data will be lost, are you sure?'
      }
    }
  }, [status])

  useEffect(() => {
    let sortedItems;
    if (sortBy === '') sortedItems = questions.filter(qn => qn).slice(0, chooseNumOfQuestions);
    if (sortBy === 'easy') sortedItems = questions.filter(qn => qn.easyMode).slice(0, chooseNumOfQuestions);
    if (sortBy === 'difficult') sortedItems = questions.filter(qn => qn.difficultMode).slice(0, chooseNumOfQuestions);
    dispatch({ type: 'sortedQuestionsArray', payload: sortedItems })
  }, [questions, sortBy, chooseNumOfQuestions, answer])

  const disabled = chooseNumOfQuestions === questions.length;
  const difficultyMode =
    <div>
      <select className="drop" value={sortBy} onChange={(e) => dispatch({ type: 'setSortBy', payload: e.target.value })} disabled={disabled}>
        <option value="">Choose difficulty</option>
        <option value="easy">Easy</option>
        <option value="difficult">Difficult</option>
      </select>
    </div>


  // console.log(sortedQuestions);
  const numQuestions = sortedQuestions.length
  const totalPoints = sortedQuestions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataRecieved', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }))
  }, [chooseNumOfQuestions])

  // console.log(answer)
  return (
    <div className="app">
      <Header />
      <Main>
        {/* mutually exclusive therefore they do not need ternaries. Cos only one can be true at a time */}
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen mode={difficultyMode} dispatch={dispatch} />}
        {status === 'active' &&
          <>
            {/* <p style={{ textAlign: 'center', fontSize: "30px", paddingBottom: "10px" }}><strong>Current Highscore: {highscore}</strong></p> */}
            <ProgressBar totalPointsAcquired={points} answer={answer} curQuestionNum={index} numQuestions={numQuestions} totalPossiblePoints={totalPoints} />
            <Question dispatch={dispatch} answer={answer} question={sortedQuestions[index]} />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton dispatch={dispatch} curQuestionNum={index} answer={answer} questions={sortedQuestions} />
            </Footer>
          </>
        }
        {status === 'finished' && <FinishedScreen totalPointsAcquired={points} highscore={highscore} answer={answer} dispatch={dispatch} totalPossiblePoints={totalPoints} />}
      </Main>
    </div>
  );
}

export default App;


// import DateCounter from './DateCounter';
{/* <DateCounter /> */ }
