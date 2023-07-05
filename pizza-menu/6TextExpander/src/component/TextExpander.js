
import { useState } from 'react'




function TextExpander({ children, wordLimit = 0, color = '#000', boxClass, buttonInline, expandButton, collapseButtonText, buttonColor }) {
    const [reveal, setReveal] = useState(buttonInline)

    const halfText = children.slice(0, wordLimit)
    const fullText = children.slice(wordLimit, -1);
    // console.log(halfText)
    // console.log(fullText)

    const Button = ({ element, btnClick, buttonStyle }) => {
        const [count, setCount] = useState(0)
        return <><button onClick={() => setCount(el => el + 1)}>{count}</button> <button onClick={() => btnClick(el => !el)} style={buttonStyle}>{element}</button></>
    }

    const lengthOfDisplayText = !reveal && !wordLimit ? children : reveal ? children : halfText + '...'
    const buttonStyle = {
        cursor: 'pointer',
        backgroundColor: `${buttonColor}`,
        marginLeft: "10px",
        padding: '5px',
        border: '1px solid #ff6622',
        color: `${color}`
    }

    return (
        <div className={boxClass}>
            {lengthOfDisplayText}
            {!reveal && !wordLimit ? null : <Button btnClick={setReveal} buttonStyle={buttonStyle}
                element={reveal ? collapseButtonText : expandButton} />}

            {/* correct but longer */}
            {/* {wordLimit > 0 ? `${halfText}${!reveal ? '...' : ''}` : halfText + fullText}
            {wordLimit > 0 && !reveal && <span style={showMoreStyle}
                onClick={() => setReveal(el => !el)}> <Button element={expandButton} />
            </span>
            }
            {reveal && fullText}
            {reveal && <span style={showMoreStyle}
                onClick={() => setReveal(el => !el)}><Button element={collapseButtonText} />
            </span>} */}
        </div>
    )
}

export default TextExpander