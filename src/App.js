import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const initialState = {
    businesses: [],
    reigon: [],
    total: 0
  }

  const searchParam = 'rice'
  const location = {
    latitude: null,
    longitude: null
  }
 // eslint-disable-next-line no-unused-vars
 const [restaurants, setRestaurants] = useState(initialState)

  // this is a formatter that you could use to format the location if you got it from the browser
  // if this does not make sense than we can go through what the code is doing
  // eslint-disable-next-line no-unused-vars
  function formatLocationToUrlEncode(locationObject) {
    const objectKeys = Object.keys(locationObject)
    objectKeys.map((key, index) => {
        if (locationObject[key]) return `${key}=${locationObject[key]}`
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const callYelpApiWithCredentials = async (searchParam, location) => {
      const requestUrl = 'http://127.0.0.1:4000/https://api.yelp.com/v3/businesses/search'
    try {
      const response = await fetch(`${requestUrl}?term=${searchParam}&location=NYC`, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
        }
    })
    const restaurantsResponse = await response.json()
    console.log(restaurantsResponse)
    setRestaurants(restaurantsResponse)

    } catch (error) {
      console.error(error)
    }
  }

    callYelpApiWithCredentials(searchParam, location)

}, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <ul>
      {restaurants.businesses.map(business =>
          <li key={`${business.name}`}>
            {business.name}
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
