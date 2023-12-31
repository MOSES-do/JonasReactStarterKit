// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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

function Form() {

  const { lat, lng } = useUrlPosition()
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const { addNewCity, isLoading } = useCities()
  const navigate = useNavigate();

  const BASE_URL = 'https://api.geoapify.com/v1/geocode/reverse'
  const API_KEY = 'f3569be280154ea0b04886e0878f77c4'

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [emoji, setEmoji] = useState()
  const [geoCodingError, setGeoCodingError] = useState("")


  useEffect(function () {

    if (!lat && !lng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true)
        setGeoCodingError('')
        const res = await fetch(`${BASE_URL}?lat=${lat}&lon=${lng}&apiKey=${API_KEY}`);
        const data = await res.json()
        const geoProps = data.features[0].properties;
        // console.log(geoProps.country)

        //err.message
        if (!geoProps.country_code) throw new Error("There doesn't seem to be a city. Click somewhere else👇")

        setCityName(geoProps.city || geoProps.county || "")
        setCountry(geoProps.country)
        setEmoji(convertToEmoji(geoProps.country_code))
        // console.log(geoProps)
      } catch (err) {
        setGeoCodingError(err.message)
      } finally {
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData()
  }, [lat, lng])




  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!cityName || !date) return;

    const newCity = { cityName, country, emoji, date, notes, position: { lat, lng } }

    await addNewCity(newCity)
    navigate('/app')
    // console.log(newCity)
    setCityName('')
    setNotes('')
    setEmoji()
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
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" selected={date} onChange={date => setDate(date)} dateFormat='dd/MM/yyyy' />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button disable={disableAddButton} type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
