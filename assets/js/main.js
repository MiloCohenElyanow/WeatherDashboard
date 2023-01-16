//setting main function to work with Jquery
$(function () {
  var fiveDaysOfWeather = [];
  let currDTValue = moment().format("YYYY-MM-DD hh:mm:ss");
  let newcurrDTValue = currDTValue.split(" ")[0];


  let apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=Minneapolis&appid=2418d1b1a7602fe4aa1d23d0348d81e2&units=imperial";
  let todayWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=44.9537&lon=93.0900&appid=2418d1b1a7602fe4aa1d23d0348d81e2&units=imperial`;
  let newUrl = "http://api.openweathermap.org/data/2.5/forecast?q=miami&appid=2418d1b1a7602fe4aa1d23d0348d81e2&units=imperial";
  let cityName = "";
  let returnCity = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},001&appid=2418d1b1a7602fe4aa1d23d0348d81e2&units=imperial`;

  $("#srcButton").click(srcButtonClick);
  function srcButtonClick(returnCity,){ // getting city name from src button 
    cityName = $("#citySrcField").val()
    returnCity = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},001&appid=2418d1b1a7602fe4aa1d23d0348d81e2&units=imperial`
    fetch(returnCity) //passing city name from src bar to api geocoder to get lat and long for that city name. this tends to work better and far more consistently than passing a city name directly to the api
    .then(response => {
      return response.json()
    })
    .then(data => {
      var tempLat = data[0].lat;
      var tempLon = data[0].lon;
      var forecastfromsearch = `http://api.openweathermap.org/data/2.5/forecast?lat=${tempLat}&lon=${tempLon}&appid=2418d1b1a7602fe4aa1d23d0348d81e2&units=imperial`
      apiUrl = forecastfromsearch; // resetting the api urls this way seemed to be the only way I could get them to work properly, its certainly not pretty but it gets the job done
      getWeatherData(apiUrl);
      var newtodayweatherurl = `http://api.openweathermap.org/data/2.5/weather?lat=${tempLat}&lon=${tempLon}&appid=2418d1b1a7602fe4aa1d23d0348d81e2&units=imperial`; // setting new todayweatherurl for when gettodaysweather is called from the button click.
      todayWeatherUrl = newtodayweatherurl;
      getTodaysWeather(todayWeatherUrl)
    })
  }
  function getTodaysWeather(){
    fetch(todayWeatherUrl)
    .then(response => {
      return response.json() // returning response parsed with json and sending to next .then
    })
    .then(data => {
      var thisthing = $("#todayWeather")
      $(thisthing).children().first().text("weather for "+data.name+" Today")
      $("#weatherImg-main").attr("src" ,`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`) // all of these just write data recieved to the page with jquery dom tree!
      $(thisthing).children().first().next().next().text("feels like: "+ data.main.feels_like+"°F")
      $(thisthing).children().first().next().next().next().text("Humidity: "+ data.main.humidity)
      $(thisthing).children().first().next().next().next().next().text("Wind:  "+ data.wind.speed+" @ "+data.wind.deg+"°");
      $(thisthing).children().first().next().next().next().next().next().text(""+data.weather[0].description);

    })
  }

  function getWeatherData(apiUrl){
    fetch(apiUrl)
    .then( response => {
      return response.json()
    })
    .then( data => {
      // send the data to the parsing function below
      console.log("API was called succesfully..."); //leaving this in, so if anyone is bug checking the functonality is readily available and problems can be solved a little easier.
      parseWeatherData(data.list)
    })
  }
  function parseWeatherData(data){
    fiveDaysOfWeather = [] // clearing array before it is written to again
    data.forEach( obj => {
      // use moment or dayjs to parse the obj dt variable and get the "real date"
      const dateObj = moment(obj.dt_txt)
      const currday = dateObj._i; 
      const newCurrDay = currday.split(" ")[0];
      // some if this if statement was given to us by gary some was added in by me to work easier for how I understand it
      if( newCurrDay !== newcurrDTValue && fiveDaysOfWeather.length < 5 && !fiveDaysOfWeather.find( day => day.dt_txt.split(" ")[0] === obj.dt_txt.split(" ")[0] ) ){
        currDTValue = newCurrDay
        fiveDaysOfWeather.push(obj);
    }
    });
    writeContent(fiveDaysOfWeather);
  }

  function writeContent (){
    getTodaysWeather();
    var arr1 = ["#date-1","#date-2","#date-3","#date-4","#date-5"]; // making array with the parent elements to make things a bit easier for my eyes and my understanding with the dom tree
    for(var i=0; i<arr1.length;i++){
      $(arr1[i]).text(fiveDaysOfWeather[i].dt_txt.substring(0,10));
      $(arr1[i]).siblings("p").first().text("feels like: " + fiveDaysOfWeather[i].main.feels_like+"°F"); // writing stuff returning from the api to each individual html element, just seems easier. Definatly not pretty code but it gets the job done consistntly
      $(arr1[i]).siblings("p").first().next().text("Humidity: " + fiveDaysOfWeather[i].main.humidity);
      $(arr1[i]).siblings("p").first().next().next().text("wind: " + fiveDaysOfWeather[i].wind.speed + "MPH @" + fiveDaysOfWeather[i].wind.deg + "°")
      $(arr1[i]).siblings("p").first().next().next().next().text("" + fiveDaysOfWeather[i].weather[0].description);
      $(`#weatherImg-${i}`).attr("src" ,`https://openweathermap.org/img/wn/${fiveDaysOfWeather[i].weather[0].icon}@2x.png` )
    }
  }
  getWeatherData(apiUrl);
});
