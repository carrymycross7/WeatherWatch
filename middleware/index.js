var middleWareObj = {};


middleWareObj.test = function(temp){
	var parsedTemp = parseInt(temp);
	var currentTemp = ((parsedTemp - 273.15) * 9/5 + 32).toFixed(0);
	return currentTemp;
}; 

middleWareObj.toCelcius = function(temp) {
	
	var celciusTemp = (temp - 273.15).toFixed(0);
	console.log(celciusTemp);
	return celciusTemp;
};

middleWareObj.toFarenheit = function(temp){
	temp = ((temp * 9/5) + 32).toFixed(0);
	return temp;
};

middleWareObj.forecastImagePicker = function(forecast) {
	forecast = forecast.toLowerCase();
	
	var conditionsArray    = ["cloud", 'rain', 'clear', 'sun', 'snow', 'fog','mist', 'clouds'];
	var forecastImageArray = [ 'https://i.ibb.co/4snvvVr/cloudy.png',
							  	'https://i.ibb.co/6J6J8RB/rain.png',
							  	'https://i.ibb.co/m05PZQb/sunny.png',
							 	'https://i.ibb.co/m05PZQb/sunny.png',
							  	'https://i.ibb.co/vQXqpnx/snow.png',
							  	'https://i.ibb.co/4snvvVr/cloudy.png',
							  	'https://i.ibb.co/6J6J8RB/rain.png',
							  	'https://i.ibb.co/4snvvVr/cloudy.png',
		
							];
	
	
	
	var forecastString = forecast;
	var check ='';
	for (var i = 0; i  < conditionsArray.length; i++){
	
		check  = forecast.includes(conditionsArray[i]);
		if(check == true){
			return forecastImageArray[i];
			break;
			
		}
		
	};
	
	
};

middleWareObj.dateSelector = function(date){
	
	
	
		var days = ['Sunday', 'Monday',
					'Tuesday', 'Wednesday',
					'Thursday', 'Friday',
					'Saturday'
				                  ];
	
		var day = days[date.getDay()] ;
			return day;
	};
	






module.exports = middleWareObj;