const BASE_URL = 'https://api.geoapify.com/v1/geocode/reverse'
const API_KEY = '2731850a97b74aa7ad8d86ce912feec4'

/*eslint-disable*/
export async function getAddress({lat, lng}) {
  console.log(lat, lng)
  const res = await fetch(`${BASE_URL}?lat=${lat}&lon=${lng}&apiKey=${API_KEY}`)
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json()
  const geoProps = data.features[0].properties;
  // console.log(geoProps)

  return geoProps;
}
