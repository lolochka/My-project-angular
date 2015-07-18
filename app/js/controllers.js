'use strict';

/* Controllers */

var crewControllers = angular.module('crewControllers', []);

crewControllers.controller('EmployeeListCtrl', ['$scope', '$routeParams', 'Cache', '$routeSegment', function($scope, $routeParams, Cache, $routeSegment) {
  $scope.employees = [];
  $scope.employees = Cache.getItems();
  $scope.$routeSegment = $routeSegment;

  $scope.departments = [
    "web", "mobile", "testing", "sales"
  ];

  $scope.routeParams = $routeParams.employeeId;

  $scope.getEmployee = function(param) {
    var arr = $scope.employees;
    console.log(param);
    if (arr != undefined) {
      for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i]._id == param) {
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
  console.log($scope.routeParams);

  $scope.thisEmployee = $scope.getEmployee($scope.routeParams);


  $scope.getPhoto = function(obj) {
    if (obj.photoUrl != 0 && obj.photoUrl != undefined) {
      return obj.photoUrl;
    } else {
      return 'img/user.png';
    }
  };

  $scope.getExperience = function(obj) {
    if (obj.year != undefined, obj.month != undefined, obj.year != 0 || obj.month != 0 ) {
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
        if ( arr[i]._id == param) {
          arr.splice(i, 1);
          return arr[i];
        }
      }
    }
  };

  var date = new Date();
  $scope.newEmployee = {};
  //   "id": date.getTime(),
  //   "name":"",
  //    "surname":"",
  //    "title":"",
  //    "level":"",
  //    "department":"",
  //    "manager":"",
  //    "month":"",
  //    "year":"",
  //    "skills":[],
  //    "ldUrl":"",
  //    "bhUrl":"",
  //    "otherUrl":"",
  //    "skype":"",
  //    "email":"",
  //    "comments":[
  //       {
  //         "text":"",
  //         "username":"",
  //         "date": date ,
  //         "empl":date.getTime()
  //       }
  //   ],
  //   "photoUrl": ""
  // };

  $scope.addEmployee = function () {
    var date = new Date();
    $scope.newEmployee._id = date.getTime();
    $scope.newEmployee.skills = $scope.newEmployee.skills.split(", ");
    $scope.newEmployee.comments = [];
    Cache.cacheItem($scope.newEmployee._id, $scope.newEmployee);
    $scope.employees.push($scope.newEmployee);
    $scope.newEmployee = {};
    $scope.showme = false;
    return false;
  }

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
  $scope.faqs = [
  {
    'question' : 'Is the app completely free or are there premium features?',
    'answer' : 'At some point of my career I’ve had to work a lot with resumes and employee accounts. That process lacked automation and was terribly organized so I came up with an idea fit for flawless automation you are now using. All was done out of pure passion and the desire to help other people who walked in my shoes thus the app hides no fees and is 100% free to use.',
  },
  {
    'question' : 'Does the app have support?',
    'answer' : 'I’m constantly working on new functionality and fixes of existing defects so yes, there will be newer versions released soon.'
  },
  {
    'question' : 'Is there a possibility to edit employee profiles?',
    'answer' : 'I’m currently working on this particular piece of functionality so this option will be available shortly in newer versions.'
  },
  {
    'question' : 'How often are updates being released?',
    'answer' : 'Considering _app name_ is free and I wish to remain things that way and noting I am the only one creating all functionality frequent updates are not something that may be promised. However I do invest all my free time in _app name_ and I’m doing my best to ensure finest quality of the product so updates may not be too often but each of them will be of great value.'
  }
  ]
  
}]);