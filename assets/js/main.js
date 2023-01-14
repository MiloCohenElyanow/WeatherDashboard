// const weatherApi = "https://api.openweathermap.org/data/2.5/weather?lat=44.9537&lon=93.0900&appid=2418d1b1a7602fe4aa1d23d0348d81e2";

// const apiForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=44.9537&lon=93.0900&appid=2418d1b1a7602fe4aa1d23d0348d81e2";



// const apiKey = "2418d1b1a7602fe4aa1d23d0348d81e2";

// const currentHour = parseInt(moment().hour());
// const currentMinute = moment().minutes();

// const currentMinuteMil = currentMinute * 1000 * 60 * 60;
// const currentHourMil = currentHour * 1000 * 60 * 60 * 60; // converting the current time in hours from moment.js into the datetime format from open weather api

// const timeInDT = currentMinuteMil + currentHourMil; // current time in date time format

// const todayDate = moment().date()
// console.log(todayDate);

// fetch(apiForecast)
//   .then(function(response){
//   console.log(response);
//   return(response.json());
// })
//   .then(function(data){
//   console.log("RETURNING DATA:---------------\n",data);
// })

// fetch(apiForecast)
//   .then(function(response){
//     console.log(response);
//     return(response.json());
//   })
//   .then(function(data){
//     console.log("APIFORECAST------------------------\n", data);
//     const day1 = (data.list[2]);
//     const day2 = (data.list[10]);
//     const day3 = (data.list[18]);
//     const day4 = (data.list[26]);
//     const day5 = (data.list[34]);

//     return day1
//   })








//IMPORTANT--------------api call for city ---------api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key} -------- OR -----------api.openweathermap.org/data/2.5/forecast?id={city ID}&appid={API key}


/**Limitation of result
To limit number of timestamps in the API response please setup cnt.

Parameters
cnt	optional	A number of timestamps, which will be returned in the API response.
Examples of API calls

https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&cnt=3&appid={API key} */


//https://openweathermap.org/forecast5#parameter         // good notes here


// console.log("#==========================================================================================#\n")

// const currDay = moment().format("DD");
// const currYear = moment().format("YYYY");
// const currMonth = moment().format("MM");

// console.log("MONTH: ",currMonth);
// console.log("DAY: ",currDay);
// console.log("YEAR: ",currYear);

// const returnLimit = 40;

// const apitest = `https://api.openweathermap.org/data/2.5/forecast?lat=44.9537&lon=93.0900&cnt=${returnLimit}&appid=2418d1b1a7602fe4aa1d23d0348d81e2&units=imperial`


// const bruh = {thing1: "brah",thing2:"brah2",thing3:"brah3" };

// function apitestfunc (){
//   fetch(apitest)
//   .then(response => {
//     return response.json()
//   })
//   .then(data => {
//     console.log("returning data from test api call--------\n", data.list);
//     console.log("okgfnjdfglkjnfdglkf",data.list[1]);
//     console.log(data.list[1].dt_txt);
//     console.log(typeof data.list[1].dt_txt);
    
//     data.list.forEach()
//   })
// }


// apitestfunc();
// console.log("#==========================================================================================#\n")




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
    console.log("API was called succesfully...");

    parseWeatherData(data.list)
  })
}

function parseWeatherData(data){
  data.forEach( obj => {
    // use moment or dayjs to parse the obj dt variable and get the "real date"
    const dateObj = moment(obj.dt_txt)
    const currday = dateObj._i; 
    const newCurrDay = currday.split(" ")[0];

    // if the current dt value differs from the global variable, AND we don't have data in our array for this day, 
    // we must be on a new day
    if( newCurrDay !== newcurrDTValue && fiveDaysOfWeather.length < 5 && !fiveDaysOfWeather.find( day => day.dt_txt.split(" ")[0] === obj.dt_txt.split(" ")[0] ) ){
      currDTValue = newCurrDay
      fiveDaysOfWeather.push(obj)
  }
  })

  //Once the code gets here, we should have one weather object per day.
  console.log("FIVE DAYS OF WEATHER OBJ",fiveDaysOfWeather)
}

getWeatherData();
/* const apiKey = '04133e2124a97e14dd84749c9f4ac83ff'
const apiLink = "https://api.openweathermap.org/data/2.5/forecast?lat=44.9537&lon=93.0900&appid=04133e2124a97e14dd84749c9f4ac83f&units=imperial"
const mainContainer = document.getElementById('page')
let currDTValue = moment().format("YYYY-MM-DD hh:mm:ss");
let newcurrDTValue = currDTValue.split(" ")[0]
const fiveDaysOfWeather = []

function weatherDataCollection(){
  fetch(apiLink)
    .then (response =>{
      //console.log(response);
      return response.json();
    })
    .then(data => {
      //console.log(data);
      parseWeatherData(data.list)
    })
}

function parseWeatherData(data){
  //console.log(data)
  data.forEach(obj => {
    const dateObj = moment(obj.dt_txt)
    const currday = dateObj._i; 
    const newCurrDay = currday.split(" ")[0];
    //console.log(dateObj)
    //console.log(currday.split(" "))
    //console.log(currDTValue)

    console.log(newCurrDay)
     if( newCurrDay !== newcurrDTValue && fiveDaysOfWeather.length < 5 && !fiveDaysOfWeather.find( day => day.dt_txt.split(" ")[0] === obj.dt_txt.split(" ")[0] ) ){
        currDTValue = newCurrDay
        fiveDaysOfWeather.push(obj)
    }
  })
  addDataToPage(fiveDaysOfWeather)
}

function addDataToPage(){

}

weatherDataCollection();
*/













// var bruh = 
//   {
//     "cod": "200",
//     "message": 0,
//     "cnt": 40,
//     "list": [
//     {
//       "dt": 1661871600,
//       "main": {
//         "temp": 296.76,
//         "feels_like": 296.98,
//         "temp_min": 296.76,
//         "temp_max": 297.87,
//         "pressure": 1015,
//         "sea_level": 1015,
//         "grnd_level": 933,
//         "humidity": 69,
//         "temp_kf": -1.11
//       },
//       "weather": [
//         {
//           "id": 500,
//           "main": "Rain",
//           "description": "light rain",
//           "icon": "10d"
//         }
//       ],
//       "clouds": {
//         "all": 100
//       },
//       "wind": {
//         "speed": 0.62,
//         "deg": 349,
//         "gust": 1.18
//       },
//       "visibility": 10000,
//       "pop": 0.32,
//       "rain": {
//         "3h": 0.26
//       },
//       "sys": {
//         "pod": "d"
//       },
//       "dt_txt": "2022-08-30 15:00:00"
//     },
//     {
//       "dt": 1661882400,
//       "main": {
//         "temp": 295.45,
//         "feels_like": 295.59,
//         "temp_min": 292.84,
//         "temp_max": 295.45,
//         "pressure": 1015,
//         "sea_level": 1015,
//         "grnd_level": 931,
//         "humidity": 71,
//         "temp_kf": 2.61
//       },
//       "weather": [
//         {
//           "id": 500,
//           "main": "Rain",
//           "description": "light rain",
//           "icon": "10n"
//         }
//       ],
//       "clouds": {
//         "all": 96
//       },
//       "wind": {
//         "speed": 1.97,
//         "deg": 157,
//         "gust": 3.39
//       },
//       "visibility": 10000,
//       "pop": 0.33,
//       "rain": {
//         "3h": 0.57
//       },
//       "sys": {
//         "pod": "n"
//       },
//       "dt_txt": "2022-08-30 18:00:00"
//     },
//     {
//       "dt": 1661893200,
//       "main": {
//         "temp": 292.46,
//         "feels_like": 292.54,
//         "temp_min": 290.31,
//         "temp_max": 292.46,
//         "pressure": 1015,
//         "sea_level": 1015,
//         "grnd_level": 931,
//         "humidity": 80,
//         "temp_kf": 2.15
//       },
//       "weather": [
//         {
//           "id": 500,
//           "main": "Rain",
//           "description": "light rain",
//           "icon": "10n"
//         }
//       ],
//       "clouds": {
//         "all": 68
//       },
//       "wind": {
//         "speed": 2.66,
//         "deg": 210,
//         "gust": 3.58
//       },
//       "visibility": 10000,
//       "pop": 0.7,
//       "rain": {
//         "3h": 0.49
//       },
//       "sys": {
//         "pod": "n"
//       },
//       "dt_txt": "2022-08-30 21:00:00"
//     },
// // ................
//     {
//       "dt": 1662292800,
//       "main": {
//         "temp": 294.93,
//         "feels_like": 294.83,
//         "temp_min": 294.93,
//         "temp_max": 294.93,
//         "pressure": 1018,
//         "sea_level": 1018,
//         "grnd_level": 935,
//         "humidity": 64,
//         "temp_kf": 0
//       },
//       "weather": [
//         {
//           "id": 804,
//           "main": "Clouds",
//           "description": "overcast clouds",
//           "icon": "04d"
//         }
//       ],
//       "clouds": {
//         "all": 88
//       },
//       "wind": {
//         "speed": 1.14,
//         "deg": 17,
//         "gust": 1.57
//       },
//       "visibility": 10000,
//       "pop": 0,
//       "sys": {
//         "pod": "d"
//       },
//       "dt_txt": "2022-09-04 12:00:00"
//     }
//   ],
//   "city": {
//     "id": 3163858,
//     "name": "Zocca",
//     "coord": {
//       "lat": 44.34,
//       "lon": 10.99
//     },
//     "country": "IT",
//     "population": 4593,
//     "timezone": 7200,
//     "sunrise": 1661834187,
//     "sunset": 1661882248
//   }
// }

