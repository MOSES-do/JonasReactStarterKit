import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCities } from '../context/CitiesContext'

/*eslint-disable*/

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));


const CityItem = ({ city }) => {
    const { currentCity, deleteCity } = useCities();
    const { cityName, emoji, date, position: { lat, lng }, id } = city
    // console.log(activeId)

    const handleClick = (e) => {
        e.preventDefault()
        deleteCity(id)
    }

    return (
        <li >
            <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`} to={`${id}?lat=${lat}&lng=${lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <span className={styles.name}>{cityName}</span>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem