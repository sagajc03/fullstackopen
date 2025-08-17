import { useState, useEffect } from 'react'
import axios from 'axios'


// const Countries = ({countries}) => {
//   if (!countries) {
//     return (
//       <div>Countries</div>
//     )
//   } else {
//     return (
//       <div>
//         {countries.map(country => {<p>{country.name.common}</p>})}
//       </div>
//     )
//   }  
// }


function App() {

  const [countries, setCountries] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (inputValue.trim() === '') {
      setCountries([])
      return
    } 
      const fetchCountry=  async() => {
        try {
          const url = `https://restcountries.com/v3.1/name/${inputValue}`
          const response = await axios.get(url)
          console.log(response.data);
          setCountries(response.data)
          setWeather(null)
          if (response.data.length === 1) {
            const capital = response.data[0].capital
            fetchWeatherData(capital)
          }
          setSelectedCountry(response.data.length === 1 ? countries[0]: null)
        } catch (error) {
            console.error('Error fetching data: ' + error.data) 
        }
      }
      fetchCountry()
      
  }, [inputValue])

  const fetchWeatherData = async(capital) =>{
    try {
      const apiKey = import.meta.env.VITE_WEATHER_KEY
      const v2_5 = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      const weatherResponse = await axios.get(v2_5)
      setWeather(weatherResponse.data)
      setApiError(null)
    } catch (error) {
      console.error('Error fetching the weather data', error.data)
      setWeather(null)
      setApiError('Failed to fetch weather data', error.data)
    }
  }

  const renderLanguage = (languages) => {
    if(Array.isArray(languages)){
      return languages.join(",")
    }
    else if(typeof languages==="object"){
      return Object.values(languages).join(",")
    } else {
      return "Unknown"
    }
  }

  const onClickShow = (country) => {
    setSelectedCountry(country)
    fetchWeatherData(country.capital)
  }

  return (
    <>
      <h1>Country Info App</h1>
      <form action="">
        <div>
          find countries: <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        </div>
      </form>

      {countries.length > 10 && (<p>Too many info, please be specific</p>)}

      {countries.length <= 10 && countries.length > 1 && (
        <div>
          <h2>Countries found</h2>
          <ul>
            {countries.map(country => (
              <li key={country.name.common}>{country.name.common}<button onClick={() => onClickShow(country)}>Show</button></li>
            )
          )}
          </ul>
        </div>
      )}

      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area}</p>
          <p>Region: {selectedCountry.region}</p>
          <img src={selectedCountry.flags.svg} alt={selectedCountry.flags.alt} />
          <h4>Languages</h4>
          <ul>
            {renderLanguage(selectedCountry.languages)}
          </ul>
          
          

          {apiError && <p>{apiError}</p>}
        </div>
      )}
      {
            weather && (
              <div>
                <h3>Weather in {selectedCountry.capital} </h3>
                <p>Temperature {weather.main.temp}</p>
                <p>Feels like {weather.main.feels_like}</p>
                <p>Humidity {weather.main.humidity}</p>
                <p>Description: {weather.weather[0].description}</p>
                <p>Weather Icon: </p>
                {
                  weather.weather[0].icon && (
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
                  )
                }
              </div>
            )
          }
    </>
  )
}

export default App
