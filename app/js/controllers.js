'use strict';

/* Controllers */

var crewControllers = angular.module('crewControllers', []);

crewControllers.controller('EmployeeListCtrl', ['$scope', 'Cache', '$location', '$window', 'Employee', function ($scope, Cache, $location, $window, Employee) {
  $scope.employees = Cache.getItems();
  $scope.thisEmployee = {};
  $scope.newEmployee = {};

  $scope.levels = [
    {value: 'Junior',
      name: 'Junior'},
    {value: 'Middle',
      name: 'Middle'},
    {value: 'Senior',
      name: 'Senior'}
  ];

  $scope.departments = [
    {value: 'mobile',
      name: 'Mobile'},
    {value: 'sales',
      name: 'Sales'},
    {value: 'web',
      name: 'Web'},
    {value: 'testing',
      name: 'Testing'}
  ];

  $scope.months = [
    {value: "0",
      name: 'January'},
    {value: "1",
      name: 'February'},
    {value: "2",
      name: 'March'},
    {value: "3",
      name: 'April'},
    {value: "4",
      name: 'May'},
    {value: "5",
      name: 'June'},
    {value: "6",
      name: 'July'},
    {value: "7",
      name: 'August'},
    {value: "8",
      name: 'Septmber'},
    {value: "9",
      name: 'October'},
    {value: "10",
      name: 'November'},
    {value: "11",
      name: 'December'}
  ];

  $scope.getPhoto = function (obj) {
    if (obj.photoUrl !== 0 && obj.photoUrl !== undefined) {
      return obj.photoUrl;
    } else {
      return 'img/user.png';
    }
  };

  
  $scope.deleteEmployee = function (param) {
    Cache.removeItem(param);
    var arr = $scope.employees;
    if (arr !== undefined) {
      for (var i = 0; i < arr.length; i++ ) {
        if ( arr[i]._id == param) {
          if (i > 0) {
            var k = i - 1;
            $location.path("/employees/" + arr[k]._id).replace();
          } else {
            $location.path("/employees/").replace();
          }
          arr.splice(i, 1);
          return arr[i];
        }
      }
    }
  };
  
  $scope.addEmployee = function () {
    $scope.newEmployee.skills = $scope.newEmployee.skills.split(", ");
    if ($scope.newEmployee._id == undefined) {
      var date = new Date();
      $scope.newEmployee._id = date.getTime();
      $scope.newEmployee.comments = [];
      $scope.employees.push($scope.newEmployee);
      Cache.cacheItem($scope.newEmployee._id, $scope.newEmployee);
      $location.path("/employees/"+$scope.newEmployee._id).replace();
    } else {
      angular.copy($scope.newEmployee, $scope.thisEmployee);
      for (var i = 0; i < $scope.employees.length; i++) {
        if ( $scope.employees[i]._id == $scope.newEmployee._id) {
          $scope.employees[i] = $scope.newEmployee;
          Cache.cacheItem($scope.newEmployee._id, $scope.newEmployee);
          $location.path("/employees/"+$scope.newEmployee._id).replace();
          $window.location.reload();
        }
      }
    }
    $scope.newEmployee = {};
    $scope.showme = false;
    return false;
  }

  $scope.editEmployee = function (obj) {
    $scope.showme = true;
    angular.copy(obj, $scope.newEmployee);
    $scope.newEmployee.skills = $scope.newEmployee.skills.join(', ');
  }

}])

  .controller('EmployeeDataCtrl', ['$scope', '$routeParams', 'Cache', '$routeSegment', '$location', 'Employee',  function($scope, $routeParams, Cache, $routeSegment, $location, Employee) {
    $scope.routeParams = $routeParams.employeeId;
    // $scope.thisEmployee = $scope.getEmployee($scope.routeParams);
    $scope.thisEmployee = Cache.getItem($routeParams.employeeId);
    
    $scope.experience = Employee.getExperience;
    console.log($scope.experience);
    console.log($scope.thisEmployee);

    $scope.newComment = {};
    $scope.addComment = function(obj) {
      if ($scope.newComment.text) {
        var date = new Date();
        $scope.newComment.date = date;
        $scope.newComment.username = 'User';
        $scope.newComment._id = date.getTime();
        var newComment = $scope.newComment;
        obj.comments.push(newComment);
        Cache.cacheItem(obj._id, obj);
        $scope.newComment = {};
        return obj;
      }
    }
    $scope.removeComment = function (comment) {
      for (var i = 0, ii = $scope.thisEmployee.comments.length; i < ii; i++) {
        if (comment === $scope.thisEmployee.comments[i]) {
          $scope.thisEmployee.comments.splice(i, 1);
        };
      }
      Cache.cacheItem($scope.thisEmployee._id, $scope.thisEmployee);
    };
    
    $scope.showDetails = "show";
    
    $scope.hideDetails = function() {
      $location.path("/employees/").replace();
    }
  }]);


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