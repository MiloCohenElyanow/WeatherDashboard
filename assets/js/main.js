







$(function () {
  var fiveDaysOfWeather = [];



  let currDTValue = moment().format("YYYY-MM-DD hh:mm:ss");
  let newcurrDTValue = currDTValue.split(" ")[0]


  let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=44.9537&lon=93.0900&cnt=40&appid=2418d1b1a7602fe4aa1d23d0348d81e2&units=imperial";
  const todayWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=44.9537&lon=93.0900&appid=2418d1b1a7602fe4aa1d23d0348d81e2&units=imperial"




  $("#srcButton").click(srcButtonClick);
  function srcButtonClick(){
    var currSrcField = $("#citySrcField").val()
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${currSrcField}&appid=2418d1b1a7602fe4aa1d23d0348d81e2&units=imperial`
    fetch(apiUrl)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log("Data from new city src",data);
      console.log("going to parseweatherdata with new city src")
      getWeatherData(data.list);
    })

    
  }





  function getTodaysWeather(){
    fetch(todayWeatherUrl)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
      var thisthing = $("#todayWeather")
      $(thisthing).children().first().text("weather for "+data.sys.country+" Today")
      $("#weatherImg-main").attr("src" ,`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
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
        console.log(obj)
        fiveDaysOfWeather.push(obj);
        console.log(fiveDaysOfWeather);
    }
    });
    writeContent(fiveDaysOfWeather);
  }

  function writeContent (){
    getTodaysWeather();
    var arr1 = ["#date-1","#date-2","#date-3","#date-4","#date-5"]; // making array with the parent elements to make things a bit easier for my eyes and my understanding with the dom tree
    for(var i=0; i<arr1.length;i++){
      $(arr1[i]).text(fiveDaysOfWeather[i].dt_txt.substring(0,10));
      $(arr1[i]).siblings("p").first().text("feels like: " + fiveDaysOfWeather[i].main.feels_like+"°F"); // writing stuff returning from the api to each individual html element, just seems easier.
      $(arr1[i]).siblings("p").first().next().text("Humidity: " + fiveDaysOfWeather[i].main.humidity);
      $(arr1[i]).siblings("p").first().next().next().text("wind: " + fiveDaysOfWeather[i].wind.speed + "MPH @" + fiveDaysOfWeather[i].wind.deg + "°")
      $(arr1[i]).siblings("p").first().next().next().next().text("" + fiveDaysOfWeather[i].weather[0].description);
      $(`#weatherImg-${i}`).attr("src" ,`https://openweathermap.org/img/wn/${fiveDaysOfWeather[i].weather[0].icon}@2x.png` )
    }
  }
  getWeatherData();
});
