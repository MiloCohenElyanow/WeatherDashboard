







$(function () {
  var fiveDaysOfWeather = [];

  var weatherInfo =[];

  let currDTValue = moment().format("YYYY-MM-DD hh:mm:ss");
  let newcurrDTValue = currDTValue.split(" ")[0]


  const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=44.9537&lon=93.0900&cnt=40&appid=2418d1b1a7602fe4aa1d23d0348d81e2&units=imperial";

  function getWeatherData(){
    fetch(apiUrl)
    .then( response => {
      return response.json()
    })
    .then( data => {
      // send the data to the parsing function below
      console.log("API was called succesfully..."); //just a easy way to check if the api was called and returned info correctly
      parseWeatherData(data.list)
      return fiveDaysOfWeather
    })
  }
  function parseWeatherData(data){
    data.forEach( obj => {
      // use moment or dayjs to parse the obj dt variable and get the "real date"
      var y = 0
      y++;
      const dateObj = moment(obj.dt_txt)
      const currday = dateObj._i; 
      const newCurrDay = currday.split(" ")[0];
      // some if this if statement was given to us by gary some was added in by me to work easier for how I understand it
      if( newCurrDay !== newcurrDTValue && fiveDaysOfWeather.length < 5 && !fiveDaysOfWeather.find( day => day.dt_txt.split(" ")[0] === obj.dt_txt.split(" ")[0] ) ){
        currDTValue = newCurrDay
        console.log(obj)
        fiveDaysOfWeather.push(obj);
    }
    });
    writeContent(fiveDaysOfWeather);
  }

  function writeContent (){
    console.log("THIS HERE THIS",fiveDaysOfWeather);
    var arr1 = ["#date-1","#date-2","#date-3","#date-4","#date-5"];
    for(var i=0; i<arr1.length;i++){
      $(arr1[i]).text(fiveDaysOfWeather[i].dt_txt.substring(0,10));
      $(arr1[i]).siblings("p").first().text("feels like: " + fiveDaysOfWeather[i].main.feels_like);
      $(arr1[i]).siblings("p").first().next().text("Humidity: " + fiveDaysOfWeather[i].main.humidity);
      $(arr1[i]).siblings("p").first().next().next().text("" + fiveDaysOfWeather[i].weather[0].description);

    }
  }
  getWeatherData();
});
