import { Sidebar, Map, User } from "../components"
import styles from './AppLayout.module.css'



const AppLayout = () => {


    return (
        <div className={styles.app}>
            <User />
            <Sidebar />
            <Map />
        </div>
    )
}

export default AppLayout