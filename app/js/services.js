'use strict';

/* Services */

var crewServices = angular.module('crewServices', ['ngResource']);

crewServices.factory('Cache', ['$resource', function() {
	var cache_service = {};

	cache_service.cacheItem = function(key, value) {
      localStorage[key] = JSON.stringify(value);
	};

	cache_service.getItem = function(key){
      if (key != undefined) {
        return JSON.parse(localStorage[key]);
  	   } else {
  		return 0;
  	   }
    };

    cache_service.getItems = function(){
  	 var arr = [];
  	 if (localStorage.length > 0) {
	  	for (var i = 0; i < localStorage.length; i++) {
	      var key = localStorage.key(i);
	      if (key.length == 13) {
	        var item = JSON.parse(localStorage[key]);
	        arr.push(item);
	      }
	    }
	  };
	  return arr;
    };

    cache_service.itemExist = function(key){
      return (localStorage[key] !== undefined);
    };

    cache_service.removeItem = function(key){
      localStorage.removeItem(key);
    };

    cache_service.clear = function(){
      localStorage.clear();
    };

    return cache_service;
}]);

crewServices.factory('Employee', ['$resource', function() {
    var employee_service = {};
      
    employee_service.getExperience = function(obj) {
      if ((obj.year !== undefined && obj.month !== undefined) && (obj.year !== 0 || obj.month !== 0)) {
      var month = obj.month;
      var year = obj.year;
      var date = new Date();
      var nowMonth = date.getMonth();
      var nowYear = date.getFullYear();
      var diffMonth;////need compile
      var diffYear;
      month === 0 ? diffMonth = 0 : diffMonth = nowMonth - month;
      year === 0 ? diffYear = 0 : diffYear = nowYear - year;
      if (diffMonth > 0) {
        if (diffYear > 0) {
          return diffYear + ' year(s) and ' + diffMonth + ' month(s)';
        } else if (diffYear === 0) {
          return diffMonth + ' month(s)';
        } else {
          return 'Have not started yet';
        }
      } else if (diffMonth === 0) {
        if (diffYear > 0) {
          return diffYear + ' year(s)';
        } else if (diffYear === 0) {
          return 'Do not have any experience';
        } else {
          return 'Have not started yet';
        }
      } else {
        diffMonth = diffMonth + 12;
        diffYear = diffYear - 1;
        if (diffYear > 0) {
          return diffYear + ' year(s) and ' + diffMonth + ' month(s)';
          } else if (diffYear === 0) {
            return diffMonth + ' month(es)';
          } else {
            return 'Have not started yet';
          }
        }//need compile
      } else {
        return false;
      }
    };
  
  
    return employee_service;
}]);