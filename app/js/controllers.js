'use strict';

/* Controllers */

var crewControllers = angular.module('crewControllers', []);

crewControllers.controller('EmployeeListCtrl', ['$scope', '$routeParams', 'Cache', '$routeSegment', function($scope, $routeParams, Cache, $routeSegment) {
  $scope.employees = Cache.getItems();
  $scope.$routeSegment = $routeSegment;

  $scope.departments = [
    "web", "mobile", "testing", "sales"
  ];

  $scope.$routeParams = $routeParams.employeeId;

  $scope.getEmployee = function(param) {
    var arr = $scope.employees;
    if (arr != undefined) {
      for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i].employeeId = param) {
        console.log(arr[i]);
        return arr[i];
        }
      }
    }
  };

  $scope.length = function(obj) {
    if (obj != 0) {
      return obj.length;
    } else { 
      return 0;
    }
  };

  console.log($scope.$routeSegment);
  console.log($scope.$routeParams);

  $scope.thisEmployee = $scope.getEmployee($scope.$routeParams);


  $scope.getPhoto = function(obj) {
    if (obj.photoUrl != 0) {
      return obj.photoUrl;
    } else {
      return 'img/user.png';
    }
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

  $scope.deleteEmployee = function(param) {
    Cache.removeItem(param);
    var arr = $scope.employees;
    if (arr != undefined) {
      for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i].employeeId = param) {
          arr.splice(i, 1);
          return arr[i];
        }
      }
    }
  };

}]);



crewControllers.controller('AboutCtrl', ['$scope', function($scope) {
  $scope.about = {
    'first' : 'blablabka',
    'second' : 'Lolooooodlllld',
    'third' : 'Hdlkjaflhflaffja'
  }
}]);
//сюда можно подключить переменной дата из локал сторедж


crewControllers.controller('FaqCtrl', ['$scope', function($scope) {
  $scope.about = [
  {
    'question' : 'blablabka',
    'answer' : 'Lolooooodlllld'
  },
  {
    'question' : 'blablabka',
    'answer' : 'Lolooooodlllld'
  },
  {
    'question' : 'blablabka',
    'answer' : 'Lolooooodlllld'
  },
  {
    'question' : 'blablabka',
    'answer' : 'Lolooooodlllld'
  }
  ]
}]);