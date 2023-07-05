import { useState } from 'react'

const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
];

// console.log(messages.length)

// practicing children props with reusable components
function StepMessage({ step, children }) {
    return (
        <div className="message">
            <h3> Step {step}:</h3>
            {children}
        </div>
    )
}
function Modal() {
    const [stepsNum, setStepsNum] = useState(1)
    const [toggle, setToggle] = useState(true)
    const previous = () => {
        setStepsNum(prev => prev > 1 ? prev - 1 : 1)
    }
    const next = () => {
        setStepsNum(prev => prev < messages.length ? prev + 1 : messages.length)
    }
    return (
        <>
            <span className="close" onClick={() => setToggle(prev => !prev)}>{toggle ? <p>&times;</p> : <p>+</p>}</span>
            {
                toggle &&
                <div className="steps">
                    <div className="numbers">
                        <div className={stepsNum >= 1 ? "active" : ""}>1</div>
                        <div className={stepsNum >= 2 ? "active" : ""}>2</div>
                        <div className={stepsNum >= 3 ? "active" : ""}>3</div>
                    </div>

                    <StepMessage step={stepsNum}>
                        {messages[stepsNum - 1]}
                    </StepMessage>

                    <div className="buttons">
                        <button onClick={previous} style={{ backgroundColor: "#7950f2", color: "#fff" }}>Previous</button>
                        <button onClick={next} style={{ backgroundColor: "#7950f2", color: "#fff" }}>Next</button>
                    </div>
                </div >
            }
        </>

    );
}

export default Modal;