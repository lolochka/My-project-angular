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