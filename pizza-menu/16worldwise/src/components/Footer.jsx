import styles from './Sidebar.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}> &copy; Copyright {new Date().getFullYear()} by WorldWise Inc</footer>
    )
}

export default Footer