//https://api.geoapify.com/v1/geocode/reverse

import { useEffect, useReducer } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from '../context/CitiesContext'



/*eslint-disable*/
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const initialState = {
  isLoadingGeocoding: false,
  cityName: '',
  country: '',
  date: new Date(),
  notes: '',
  emoji: '',
  geoCodingError: ''
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_GEO_LOADING':
      return {
        ...state, isLoadingGeocoding: action.payload
      }

    case 'SET_GEO_CODING_ERROR':
      return {
        ...state, geoCodingError: action.payload
      }

    case 'CITY_NAME':
      return {
        ...state, cityName: action.payload
      }

    case 'COUNTRY_NAME':
      return {
        ...state, country: action.payload
      }

    case 'NOTES':
      return {
        ...state, notes: action.payload
      }

    case 'EMOJI':
      return {
        ...state, emoji: convertToEmoji(action.payload)
      }

    case 'DATE':
      return {
        ...state, date: action.payload
      }

    default:
      throw new Error('Unknown action')
  }
}

function Form() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isLoadingGeocoding, cityName, country, date, notes, emoji, geoCodingError } = state

  const { lat, lng } = useUrlPosition()
  const { addNewCity, cities, isLoading } = useCities()
  const navigate = useNavigate();

  const BASE_URL = 'https://api.geoapify.com/v1/geocode/reverse'
  const API_KEY = 'f3569be280154ea0b04886e0878f77c4'

  useEffect(function () {

    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        dispatch({ type: 'SET_GEO_LOADING', payload: true })
        dispatch({ type: 'SET_GEO_CODING_ERROR', payload: '' })

        //reverse-geolocation, API fetches lat/lng details
        const res = await fetch(`${BASE_URL}?lat=${lat}&lon=${lng}&apiKey=${API_KEY}`);
        const data = await res.json()
        const geoProps = data.features[0].properties;
        console.log(geoProps.country)

        //err.message
        if (!geoProps.country_code) throw new Error("There doesn't seem to be a city. Click somewhere else👇")

        dispatch({ type: 'CITY_NAME', payload: geoProps.city || geoProps.county || "" })
        dispatch({ type: 'COUNTRY_NAME', payload: geoProps.country })
        dispatch({ type: 'EMOJI', payload: geoProps.country_code })
        // console.log(geoProps)
      } catch (err) {
        dispatch({ type: 'SET_GEO_CODING_ERROR', payload: err.message })
      } finally {
        dispatch({ type: 'SET_GEO_LOADING', payload: false })
      }
    }
    fetchCityData()
  }, [lat, lng])




  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!cityName || !date) return;

    const newCity = { cityName, country, emoji, date, notes, position: { lat, lng } }

    const dontAddCityIfItExist = cities.map(city => city.cityName === newCity.cityName)
    const bool = dontAddCityIfItExist.find(b => b === true)
    const notify = () => toast.error("City already exists in list")
    if (bool === true) notify()
    if (bool === true) return

    await addNewCity(newCity)
    navigate('/app')
    // console.log(newCity)
  }

  const disableAddButton = cityName === '';

  if (isLoadingGeocoding) return <Spinner />

  if (!lat && !lng) return <Message message='Start by clicking somewhere on the map' />;

  if (geoCodingError) return <Message message={geoCodingError} />

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => dispatch({ type: 'CITY_NAME', payload: e.target.value })}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" selected={date} onChange={date => dispatch({ type: 'DATE', payload: date })}
          dateFormat='dd/MM/yyyy' />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => dispatch({ type: 'NOTES', payload: e.target.value })
          }
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button disable={disableAddButton} type='primary'>Add</Button>
        <BackButton />
      </div>
      <ToastContainer />
    </form>
  );
}

export default Form;
