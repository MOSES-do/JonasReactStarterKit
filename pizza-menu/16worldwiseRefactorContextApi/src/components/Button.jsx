import styles from './Button.module.css'

/*eslint-disable*/
const Button = ({ children, onClick, disable, type }) => {
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`} disabled={disable}>
            {children}
        </button>
    )
}

export default Button