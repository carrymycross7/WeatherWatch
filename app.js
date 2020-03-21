var express    = require('express');
var axios      = require('axios');
var bodyParser = require('body-parser')
var app        = express();
var middleWare = require('./middleware');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


//Landing page
app.get('/', (req, res)=>{
	res.render('landing');
});


//==========================
//API Call
app.post('/forecast', (req, res)=>{
	
	let state = req.body.state;
	let city  = req.body.city;
	const url = `http://api.openweathermap.org/data/2.5/weather?q=${state},${city}&appid=55fe4a6b6f5295271626d08a03e38c6d`;


axios.get(url)
  .then(response => {
    let forecastMain = JSON.stringify(response.data.weather[0].main);
	let forecastTemp = middleWare.test(JSON.stringify(response.data.main.temp))+'\u00B0F';
	let lowTemp      = middleWare.test(JSON.stringify(response.data.main.temp_min))+'\u00B0F';
	let highTemp     = middleWare.test(JSON.stringify(response.data.main.temp_max))+'\u00B0F';
	let humidity     = response.data.main.humidity;
	let windSpeed    = response.data.wind.speed;
	forecastMain = forecastMain.replace(/['"]+/g, '');
	let forecastImage = middleWare.forecastImagePicker(forecastMain);
	
	
	console.log('NOT IN CATCH');
	res.render('forecast', {forecastImage: forecastImage,forecastMain: forecastMain, forecastTemp: forecastTemp, state: state, city: city,
						   humidity: humidity, windSpeed: windSpeed, lowTemp: lowTemp, highTemp: highTemp});
	
	
   
  })
  .catch(error => {
    console.log(error);
  });
	
	
});
//========================


//===============================================================
//detailed forecast landing page
app.get('/detailedlanding', (req,res)=>{
	res.render('detailedlanding');
});

//detailed forecast display page 
app.post('/detailedforecast', (req, res)=>{
	let state = req.body.state;
	let city  = req.body.city;
	
	const url = `http://api.openweathermap.org/data/2.5/weather?q=${state},${city}&appid=55fe4a6b6f5295271626d08a03e38c6d`;
	
	
	
	axios.get(url)
  	.then(response => {
	let forecastMain        = JSON.stringify(response.data.weather[0].main);
	let forecastDescription = JSON.stringify(response.data.weather[0].description);	
		//elminates quotes on the string output
		forecastMain = forecastMain.replace(/['"]+/g, '');
		forecastDescription = forecastDescription.replace(/['"]+/g, '');
	let forecastTemp        = middleWare.test(JSON.stringify(response.data.main.temp))+'\u00B0F';
	let lowTemp      	    = middleWare.test(JSON.stringify(response.data.main.temp_min))+'\u00B0F';
	let highTemp    	    = middleWare.test(JSON.stringify(response.data.main.temp_max))+'\u00B0F';
	let celciusTemp         = middleWare.toCelcius(JSON.stringify(response.data.main.temp))+'\u00B0C';
	let feelsLikeTemp	    = middleWare.test(JSON.stringify(response.data.main.feels_like))+'\u00B0F';

	let humidity     		= response.data.main.humidity;
	let windSpeed    		= response.data.wind.speed;
	let latitude            = response.data.coord.lat;
	let longitude	        = response.data.coord.lon;
		
	let forecastImage = middleWare.forecastImagePicker(forecastMain);
		
		
		console.log('NOT IN CATCH');
	res.render('detailedforecast', {forecastImage: forecastImage,forecastMain: forecastMain, forecastTemp: forecastTemp, forecastDescription:forecastDescription, celciusTemp:celciusTemp, state: state, city: city,
						   humidity: humidity, windSpeed: windSpeed,feelsLikeTemp:feelsLikeTemp, lowTemp: lowTemp, highTemp: highTemp,
						   latitude:latitude, longitude:longitude});
		
		
  })
	 .catch(error => {
    console.log(error);
  });
	
	
});
//===============================================================




//=================================================================
//extended forecast
app.get('/fivedaylanding', (req, res)=>{
	res.render('fivedaylanding');
});

app.post('/fivedayforecast', (req,res)=>{
	let state = req.body.state;
	let city  = req.body.city;
	const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city},${state}&key=17506fa930f14b3eb76b6837749c582a`;
	
	axios.get(url)
  	.then(response => {
	
		
	let currentDay  = 	response.data.data[0].weather.description;
	let dayTwo      =	response.data.data[1].weather.description;
	let dayThree    =	response.data.data[2].weather.description;
	let dayFour	    =   response.data.data[3].weather.description;
	let dayFive	    =   response.data.data[4].weather.description;
	let daysArray   = [currentDay, dayTwo, dayThree, dayFour, dayFive];
		
	let dayOneImg   = middleWare.forecastImagePicker(currentDay);
	let dayTwoImg   = middleWare.forecastImagePicker(dayTwo);
	let dayThreeImg = middleWare.forecastImagePicker(dayThree);
	let dayFourImg  = middleWare.forecastImagePicker(dayFour);
	let dayFiveImg  = middleWare.forecastImagePicker(dayFive);
		
	
	
		
	let dayOneDate   = new Date();	
	let dayTwoDate   = new Date(dayOneDate);
		dayTwoDate.setDate(dayTwoDate.getDate()+1);
	let dayThreeDate = new Date(dayTwoDate);	
		dayThreeDate.setDate(dayThreeDate.getDate()+1);
	let dayFourDate  = new Date(dayThreeDate);
		dayFourDate.setDate(dayFourDate.getDate()+1);
	let dayFiveDate  = new Date(dayFourDate);
		dayFiveDate.setDate(dayFiveDate.getDate()+1);
		
	let weekDayOne	     = middleWare.dateSelector(dayOneDate);
	let weekDayTwo	     = middleWare.dateSelector(dayTwoDate);
	let weekDayThree	 = middleWare.dateSelector(dayThreeDate);
	let weekDayFour	     = middleWare.dateSelector(dayFourDate);
	let weekDayFive	     = middleWare.dateSelector(dayFiveDate);
		
		
		
	let dayOneTemp   = middleWare.toFarenheit(response.data.data[0].low_temp)+'\u00B0F';
	let dayTwoTemp   = middleWare.toFarenheit(response.data.data[1].low_temp)+'\u00B0F';
	let dayThreeTemp = middleWare.toFarenheit(response.data.data[2].low_temp)+'\u00B0F';
	let dayFourTemp  = middleWare.toFarenheit(response.data.data[3].low_temp)+'\u00B0F';
	let dayFiveTemp  = middleWare.toFarenheit(response.data.data[4].low_temp)+'\u00B0F';
		
	let dayOneHigh   = middleWare.toFarenheit(response.data.data[0].max_temp)+'\u00B0F';
	let dayTwoHigh   = middleWare.toFarenheit(response.data.data[1].max_temp)+'\u00B0F';
	let dayThreeHigh = middleWare.toFarenheit(response.data.data[2].max_temp)+'\u00B0F';
	let dayFourHigh  = middleWare.toFarenheit(response.data.data[3].max_temp)+'\u00B0F';
	let dayFiveHigh  = middleWare.toFarenheit(response.data.data[4].max_temp)+'\u00B0F';
	
	let dayOneHumid     = response.data.data[0].rh;
	let dayTwoHumid     = response.data.data[1].rh;
	let dayThreeHumid   = response.data.data[2].rh;
	let dayFourHumid    = response.data.data[3].rh;
	let dayFiveHumid    = response.data.data[4].rh;	
		
		console.log(response.data.data[0]);
		
	
  
		
	
	console.log('NOT IN CATCH');
	res.render('fivedayforecast', {city: city, state:state, currentDay: currentDay, dayTwo:dayTwo, dayThree: dayThree, dayFour:dayFour, 
								   dayFive:dayFive, dayOneImg: dayOneImg, dayTwoImg: dayTwoImg, dayThreeImg: dayThreeImg,
								  dayFourImg:dayFourImg, dayFiveImg:dayFiveImg, weekDayOne:weekDayOne,
								  weekDayTwo:weekDayTwo, weekDayThree:weekDayThree, weekDayFour: weekDayFour,
								  weekDayFive:weekDayFive, dayOneTemp: dayOneTemp, dayTwoTemp:dayTwoTemp,
								  dayThreeTemp:dayThreeTemp, dayFourTemp:dayFourTemp, dayFiveTemp:dayFiveTemp,
								  dayOneHigh: dayOneHigh, dayTwoHigh: dayTwoHigh, dayThreeHigh: dayThreeHigh,
								  dayFourHigh: dayFourHigh, dayFiveHigh: dayFiveHigh, dayOneHumid: dayOneHumid,
								  dayTwoHumid: dayTwoHumid, dayThreeHumid: dayThreeHumid, dayFourHumid:dayFourHumid,
								  dayFiveHumid: dayFiveHumid} );
	
   
  })
  .catch(error => {
    console.log(error);
  });
	
});
//=================================================================






app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Server Running")
});