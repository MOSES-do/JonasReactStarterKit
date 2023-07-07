import AppNav from './AppNav'
import styles from './Sidebar.module.css'
import { Logo, Footer } from '../components/index'
import { Outlet } from 'react-router-dom'


const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />

            {/* for nested routes */}
            <Outlet />

            <Footer />
        </div>

    )
}

export default Sidebar