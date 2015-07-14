'use strict';

/* Controllers */

var crewControllers = angular.module('crewControllers', []);

crewControllers.controller('EmployeeListCtrl', ['$scope', '$routeParams', 'Cache', 
  function($scope, $routeParams, Cache) {
    $scope.employees = Cache.getItems();
    $scope.getPhoto = function(obj) {
      if (obj.photoUrl != 0) {
         return obj.photoUrl;
      } else {
        return 'img/user.png';
      }
    };
    $scope.departments = [
      "web", "mobile", "testing", "sales"
    ];
    $scope.emplRoute = $routeParams.employeeId;

    $scope.getEmployee = function(param) {
      var arr = $scope.employees;
      for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i].id = param) {
          console.log(arr[i]);
          return arr[i];
        }
      }
    }

    $scope.thisEmployee = $scope.getEmployee($scope.emplRoute);
    console.log();

    $scope.getPhoto = function(obj) {
      if (obj.photoUrl != 0) {
        return obj.photoUrl;
      } else {
        return 'img/user.png';
      }

    };

    $scope.deleteEmployee = function(param) {
      Cache.removeItem(param);

    };

    $scope.getExperience = function(obj) {
      if (obj.year != 0 || obj.month != 0 ) {
        var month = obj.month;
        var year = obj.year;
        var date = new Date();
        var nowMonth = date.getMonth();
        var nowYear = date.getFullYear();
        var diffMonth;////need compile
        var diffYear;
        month == 0 ? diffMonth = 0 : diffMonth = nowMonth - month;
        year == 0 ? diffYear = 0 : diffYear = nowYear - year;
        if (diffMonth > 0) {
          if (diffYear > 0) {
            return diffYear + ' year(s) and ' + diffMonth + ' month(s)';
          } else if (diffYear == 0) {
            return diffMonth + ' month(s)';
          } else {
            return 'Have not started yet';
          }
        } else if (diffMonth == 0) {
          if (diffYear > 0) {
            return diffYear + ' year(s)';
          } else if (diffYear == 0) {
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
    }

  }]);


      

  //     
  //   });
    
  // }]);//сюда можно подключить переменной дата из локал сторедж
