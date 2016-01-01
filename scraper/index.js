var rp = require('request-promise');
var moment = require('moment');

var baseUrl = "https://api.forecast.io/forecast/2f8efe741324bd670c91c4cd593a4062/";

var _generateUrl = function(lat, long, time){

  var result = baseUrl + lat + ',' + long;

  if(time){
    result = result + ',' + time;
  }

  result += "?units=si";

  return result;

};

var methods = {};

methods.getDailyPredictions = function(params){

  var lat = params.lat;
  var long = params.long;

  var url = _generateUrl(lat, long, null)

  return rp.get(url)
  .then(function(resp){

    return JSON.parse(resp).daily.data;

  });

};

methods.getHourlyPredictions = function(params){

  var lat = params.lat;
  var long = params.long;

  var url = _generateUrl(lat, long, null)

  return rp.get(url)
  .then(function(resp){

    return JSON.parse(resp).hourly.data;

  });

};

methods.getActualOnDay = function(params){

  var lat = params.lat;
  var long = params.long;
  var time = params.time;

  var url = _generateUrl(lat, long, time)

  return rp.get(url)
  .then(function(resp){

    return {
      daily: JSON.parse(resp).daily.data,
      hourly: JSON.parse(resp).hourly.data
    };

  });

};


module.exports = methods;
