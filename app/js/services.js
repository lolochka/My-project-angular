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

crewServices.factory('Employee', ['$location', 'Cache', '$window', function($location, Cache, $window) {
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
  
  employee_service.getPhoto = function (obj) {
    if (obj.photoUrl !== 0 && obj.photoUrl !== undefined) {
      return obj.photoUrl;
    } else {
      return 'img/user.png';
    }
  };
  
  employee_service.delete = function (key, arr) {
    Cache.removeItem(key);
    if (arr !== undefined) {
      for (var i = 0; i < arr.length; i++ ) {
        if ( arr[i]._id == key) {
          if (i > 0) {
            var k = i - 1;
            $location.path("/employees/" + arr[k]._id).replace();
          } else {
            $location.path("/employees/").replace();
          }
          arr.splice(i, 1);
          return arr;
        }
      }
    }
  };

  employee_service.add = function (obj, arr) {
    if (obj._id == undefined) {
      employee_service.addNew(obj, arr);
    } else {
      employee_service.edit(obj, arr);
    }
    obj = {};
  }
  
  employee_service.addNew = function (obj, arr) {
    var date = new Date();
    obj._id = date.getTime();
    obj.comments = [];
    arr.push(obj);
    Cache.cacheItem(obj._id, obj);
    $location.path("/employees/"+obj._id).replace();
  };

  employee_service.edit = function (obj, arr) {
    for (var i = 0; i < arr.length; i++) {
      if ( arr[i]._id == obj._id) {
        arr[i] = obj;
      }
    }
    Cache.cacheItem(obj._id, obj);
    $location.path("/employees/"+obj._id).replace();
    $window.location.reload();
  };

  employee_service.addTxt = function (obj, txt) {
    if (txt.text) {
      var date = new Date();
      txt.date = date;
      txt.username = 'User';
      txt._id = date.getTime();
      var newComment = txt;
      obj.comments.push(newComment);
      Cache.cacheItem(obj._id, obj);
      return txt;
    }
  }

  employee_service.removeTxt = function (obj, txt) {
    for (var i = 0, ii = obj.comments.length; i < ii; i++) {
      if (txt === obj.comments[i]) {
        obj.comments.splice(i, 1);
      };
    }
    Cache.cacheItem(obj._id, obj);
  }
  
  return employee_service;
}]);