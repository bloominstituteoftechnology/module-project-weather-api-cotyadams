async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]
  //http://localhost:3003/api/weather?city=${city} allows for the use of different cities with variable city
  //New+York
  // 👉 Tasks 1 - 5 go here
  //TASK 1 - Hide the div#weatherWidget
  document.querySelector('#weatherWidget').style.display = 'none'

  //TASK 2 - Add an event listener to the dropdown
  let city = '';
  let dropDown = document.getElementById('citySelect');
  dropDown.addEventListener('change', function () {
    city = this.value;
    //TASK 3 - Prepare to fetch the weather data
    dropDown.disabled = true;
    getWeather(city);
    document.querySelector('.info').textContent = 'Fetching weather data...'
  })
  
  //TASK 4 - Launch a request to the weather API
  async function getWeather(city) {
    if (city == 'New York') city = 'New+York';
    console.log(city);
    axios
    .get(`http://localhost:3003/api/weather?city=${city}`)
      .then((result) => {
        document.querySelector('#weatherWidget').style.display = 'block';
        //current temp
        document.querySelector('#apparentTemp').querySelectorAll('div')[1].textContent = result.data.current.apparent_temperature;
        //max min temp
        document.querySelector('#todayStats').querySelectorAll('div')[0].textContent = `${result.data.current.temperature_max}/${result.data.current.temperature_min}`;
        //definitions
        let todayCard = document.querySelector('#todayStats');
        let descriptionArray = todayCard.querySelectorAll('div');
        //precipitation
        descriptionArray[1].textContent = `Precipitation: ${result.data.current.precipitation_probability * 100}%`;
        //humidity
        descriptionArray[2].textContent = `Humidity: ${result.data.current.humidity}%`;
        //wind
        descriptionArray[3].textContent = `Wind: ${result.data.current.wind_speed}m/s`;
        //imagedescription
        descriptions.forEach((indexValue) => {
          if (indexValue[0] == result.data.current.weather_description) {
            document.querySelector('#todayDescription').textContent = indexValue[1]
          }
        })

          //3 day forecast
        let count = 0;
          document.querySelectorAll('.next-day').forEach((element) => {//image description
            let forecastArray = element.querySelectorAll('div');
            let weatherDescription = result.data.forecast.daily[count].weather_description
            //image description
            descriptions.forEach((indexValue) => {
              if (indexValue[0] == weatherDescription) {
                  forecastArray[1].textContent = indexValue[1];
              }
            })
            forecastArray[2].textContent = `${result.data.forecast.daily[count].temperature_min}/${result.data.forecast.daily[count].temperature_max}`
            forecastArray[3].textContent = `Precipitation: ${result.data.forecast.daily[count].precipitation_probability * 100}%`
              count++;
        });
        
        document.querySelector('.info').textContent = ''
        //bottom city name
        if (city == 'New+York') city = 'New York';
        document.querySelector('#location').querySelectorAll('div')[0].textContent = `${city}`

        //re-enable dropdown after load
        dropDown.disabled = false;
    })
    .catch(err => {
      console.log(err)
    })
    .finally(console.log('finally!'))
  }
  
  
  // 👆 WORK WORK ABOVE THIS LINE 👆
  
}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
