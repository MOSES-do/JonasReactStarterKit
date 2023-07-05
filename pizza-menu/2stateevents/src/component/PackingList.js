import { useState } from 'react'

const PackingList = ({ trips, setTrips }) => {
    const checkId = (id) => {
        const listTrips =
            trips.map((trip) => trip.id === id ? { ...trip, checked: !trip.checked } : trip);
        setTrips(listTrips);
    }

    const deleteTrip = (id) => {
        // console.log(id)
        const currentTrips = trips.filter(trip => trip.id !== id)
        setTrips(currentTrips);
    }

    const Item = ({ trip, deleteTrip, checkId }) => (
        <li style={{ listStyle: "none" }}>
            <input type="checkbox" onChange={() => checkId(trip.id)} checked={trip.checked} />
            <label
                style={(trip.checked) ? { textDecoration: "line-through" } : null}
                onDoubleClick={() => checkId(trip.id)}>{trip.item} {trip.numItems}
            </label>
            <button onClick={() => deleteTrip(trip.id)}>❌</button>
        </li>
    )

    const [sortBy, setSortBy] = useState("input")

    let sortedItems;

    if (sortBy === "input") sortedItems = trips;

    //sorts based on alphabetical order of description
    if (sortBy === "description") sortedItems = trips.slice().sort((a, b) => a.item.localeCompare(b.item));

    //Sorts based on true or false values
    // if (sortBy === 'packed') sortedItems = trips.slice().sort((a, b) => Number(a.checked) - Number(b.checked))
    if (sortBy === 'packed') sortedItems = trips.filter(trip => trip.checked);

    const clearList = () => {
        const confirmed = window.confirm('Are you sure you want to delete all items?')
        if (confirmed) setTrips([])
    }

    return (
        <div className="list">
            {trips.length ?
                <ul >
                    {sortedItems.map((trip, i) => (
                        <Item trip={trip} key={i} deleteTrip={deleteTrip} checkId={checkId} />
                    ))
                    }
                </ul>
                :
                <p>You do not have new travel destinations</p>
            }


            <div className="actions">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>

                <button onClick={clearList}>Clear list</button>
            </div>
        </div>
    )
}


export default PackingList;