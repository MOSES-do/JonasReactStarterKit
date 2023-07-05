import { useState } from 'react'

const Button = ({ text, bclr, clr, brd, pd, hov, mb }) => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const style = {
        borderRadius: `${brd}px`,
        padding: `${pd}px`,
        border: "none",
        cursor: "pointer",
        color: `${clr}`,
        marginBottom: mb !== "" ? `${mb}px` : "",
        backgroundColor: isHover ? `#${hov}` : `#${bclr}`,
    };

    return <button style={style} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>{text}</button>
}

export default Button;