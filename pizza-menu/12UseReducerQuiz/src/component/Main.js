import React, { useEffect } from 'react'
import { Loader, Error, FinishedScreen, StartScreen, Question, NextButton, ProgressBar, Footer, Timer } from './index'
import { useQuiz } from '../hook/QuizContext'


const Main = () => {

    const { status } = useQuiz()


    useEffect(() => {
        if (status === 'active' || status === 'finished') {
            window.onbeforeunload = () => {
                return 'Data will be lost, are you sure?'
            }
        }
    }, [status])

    return (
        <main className="main">
            {/* mutually exclusive therefore they do not need ternaries. Cos only one can be true at a time */}
            {status === 'loading' && <Loader />}
            {status === 'error' && <Error />}
            {status === 'ready' && <StartScreen />}
            {status === 'active' &&
                <>
                    {/* <p style={{ textAlign: 'center', fontSize: "30px", paddingBottom: "10px" }}><strong>Current Highscore: {highscore}</strong></p> */}
                    <ProgressBar />
                    <Question />
                    <Footer>
                        <Timer />
                        <NextButton />
                    </Footer>
                </>
            }
            {status === 'finished' && <FinishedScreen />}
        </main>
    )
}

export default Main