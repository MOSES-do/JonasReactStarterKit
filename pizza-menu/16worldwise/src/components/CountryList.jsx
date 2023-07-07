import Message from './Message'
import Spinner from './Spinner'
import { PropTypes } from 'prop-types'
import styles from './CountryList.module.css'
import CountryItem from './CountryItem'

const CountryList = ({ cities, isLoading }) => {

    if (isLoading) return <Spinner />

    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />

    const countries = cities.reduce((arr, city) => {
        // console.log(arr, city)
        if (!arr.map(el => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }]
        else return arr
    }, [])
    return (
        <ul className={styles.countryList}>
            {countries.map((country, i) => <CountryItem country={country} key={i} />)}
        </ul>
    )
}

CountryList.propTypes = {
    cities: PropTypes.array,
    isLoading: PropTypes.bool
}

export default CountryList