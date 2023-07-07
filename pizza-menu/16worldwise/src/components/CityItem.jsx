import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
/*eslint-disable*/

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));


const CityItem = ({ city }) => {
    const { cityName, emoji, date, position: { lat, lng }, id } = city
    return (
        <li >
            <Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <span className={styles.name}>{cityName}</span>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem