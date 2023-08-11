import { Link } from "react-router-dom"

// import { useState } from 'react'

/*eslint-disable*/
// const Button = ({ text, bclr, clr, brd, pd, hov, mb }) => {
//     const [isHover, setIsHover] = useState(false);

//     const handleMouseEnter = () => {
//         setIsHover(true);
//     };
//     const handleMouseLeave = () => {
//         setIsHover(false);
//     };

//     const style = {
//         borderRadius: `${brd}px`,
//         padding: `${pd}px`,
//         border: "none",
//         cursor: "pointer",
//         color: `${clr}`,
//         marginBottom: mb !== "" ? `${mb}px` : "",
//         backgroundColor: isHover ? `#${hov}` : `#${bclr}`,
//     };

//     return <button style={style} onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}>{text}</button>
// }


const Button = ({ children, style, disabled, to, centerAlign, type, onClick  }) => {

    const base = `bg-yellow-400 text-sm uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300  transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed  ${centerAlign}`

    const styles = {
        primary: base + ' px-4 py-3 md:px-6 md:py-4',
        small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
        secondary: `text-sm border-2 border-stone-300 uppercase font-semibold text-stone-400 inline-block tracking-wide rounded-full hover:bg-stone-300 hover:text-stone-800  transition-colors duration-300 focus:outline-none focus:text-stone-800 focus:ring focus:ring-stone-200 focus:bg-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5`,
        others: base + ' px-2 mx-3 py-[0] rounded-full'
    }

    if (to) return <Link to={to} className={styles[type]} >{children}</Link>

    if (onClick) return <button onClick={onClick} disabled={disabled} style={{ opacity: style ? "40%" : "" }}       className={styles[type]} >{children}</button>

    if (style) return <button disabled={disabled} style={{ opacity: style ? "40%" : "" }} onClick={onClick} className={styles[type]} >{children}</button>

    return <button disabled={disabled} className={styles[type]} >{children}</button>
}
export default Button;