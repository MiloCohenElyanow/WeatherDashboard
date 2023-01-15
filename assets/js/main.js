let currDTValue = moment().format("YYYY-MM-DD hh:mm:ss");
let newcurrDTValue = currDTValue.split(" ")[0]
const fiveDaysOfWeather = [];

const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=44.9537&lon=93.0900&cnt=40&appid=2418d1b1a7602fe4aa1d23d0348d81e2&units=imperial";

// Here's a sample of how you might start the app
function getWeatherData(){
  fetch(apiUrl)
  .then( response => {
    return response.json()
  })
  .then( data => {
    // send the data to the parsing function below
    console.log("API was called succesfully..."); //just a easy way to check if the api was called and returned info correctly
    parseWeatherData(data.list)
  })
}

function parseWeatherData(data){
  data.forEach( obj => {
    // use moment or dayjs to parse the obj dt variable and get the "real date"
    const dateObj = moment(obj.dt_txt)
    const currday = dateObj._i; 
    const newCurrDay = currday.split(" ")[0];

    // some if this if statement was given to us by gary some was added in by me to work easier for how I understand it
    if( newCurrDay !== newcurrDTValue && fiveDaysOfWeather.length < 5 && !fiveDaysOfWeather.find( day => day.dt_txt.split(" ")[0] === obj.dt_txt.split(" ")[0] ) ){
      currDTValue = newCurrDay
      fiveDaysOfWeather.push(obj)
  }
  })

  //Once the code gets here, we should have one weather object per day.
  console.log("FIVE DAYS OF WEATHER OBJ",fiveDaysOfWeather)
}

getWeatherData();

