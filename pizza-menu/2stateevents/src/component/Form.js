import { useState } from 'react'

function Form({ trips, addNewTrip }) {
    const [item, setItem] = useState("")
    const [numItems, setNumItems] = useState(1)
    // console.log(trips);

    const handleSubmit = (e) => {
        e.preventDefault();

        //guard clause - If no item or itemNumber do not submit form
        if (!item) return;
        //end guard clause

        const id = trips.length ? trips[trips.length - 1].id + 1 : 1;
        const myTrips = { id, item, numItems, checked: false }

        addNewTrip(myTrips)
        setItem('')
        setNumItems('')
    }


    //Creates a an array with num 1 - 20
    const Arr = Array.from({ length: 20 }, (_, i) => i + 1);

    return (
        <div className='add-form'>
            <h3>Your travel destinations 😉</h3><br />
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="item..." value={item} onChange={(e) => setItem(e.target.value)} />
                {/* <input type="text" placeholder="4" value={numItems} onChange={(e) => setNumItems(e.target.value)} /> */}
                <select value={numItems} onChange={(e) => setNumItems(Number(e.target.value))}>
                    {Arr.map((num) => (
                        <option value={num} key={num}>
                            {num}
                        </option>
                    ))}
                </select>
                <button type="submit">ADD</button>
            </form>
        </div>
    )
}

export default Form;