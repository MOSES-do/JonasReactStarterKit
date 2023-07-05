function Stats({ trips }) {

    if (!trips.length)
        return (
            <p className="stats">
                <em>Start adding travel destinations to your list🚀</em>
            </p>
        );
    // derived state
    const noOfTrips = trips.length;
    const attendedTrips = trips.filter(trip => trip.checked);
    const unattendedTrips = trips.filter(trip => !trip.checked)

    const stat = Math.round(attendedTrips.length / noOfTrips * 100);
    const tripPlural = noOfTrips === 1 ? 'trip' : 'trips';
    // console.log(stat)

    return (
        <footer className='stats'>
            <em>
                {stat === 100 ? "You attended all trips✈️"
                    :
                    `You have ${noOfTrips} ${tripPlural} in  your itenary, ${unattendedTrips.length} unattended trip. Total attended ${attendedTrips.length} (${stat || 0}%)`
                }
            </em>
        </footer>
    )
}
export default Stats;