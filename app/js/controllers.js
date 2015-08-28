'use strict';

/* Controllers */

var crewControllers = angular.module('crewControllers', []);

crewControllers.controller('EmployeeListCtrl', ['$scope', 'Cache', '$location', '$window', 'Employee', '$http', function ($scope, Cache, $location, $window, Employee, $http) {
  $scope.employees = Cache.getItems();
  $scope.thisEmployee = {};
  $scope.newEmployee = {};

  $http.get('options/levels.json').success(function(data) {
    $scope.levels = data;
  });
  $http.get('options/departments.json').success(function(data) {
    $scope.departments = data;
  });
  $http.get('options/months.json').success(function(data) {
    $scope.months = data;
  });

  $scope.photo = Employee.getPhoto;

  $scope.deleteEmployee = function (param) {
    Cache.removeItem(param);
    $scope.employees = Employee.delete (param, $scope.employees);
  };
  
  $scope.addEmployee = function() {
    $scope.newEmployee.skills = $scope.newEmployee.skills.split(", ");
    Employee.add($scope.newEmployee, $scope.employees);
    $scope.newEmployee = {};
    $scope.showme = false;
    return false;
  };

  $scope.editEmployee = function (obj) {
    $scope.showme = true;
    angular.copy(obj, $scope.newEmployee);
    $scope.newEmployee.skills = $scope.newEmployee.skills.join(', ');
  };

}])

  .controller('EmployeeDataCtrl', ['$scope', '$routeParams', 'Cache', '$routeSegment', '$location', 'Employee',  function($scope, $routeParams, Cache, $routeSegment, $location, Employee) {

    $scope.routeParams = $routeParams.employeeId;
    // $scope.thisEmployee = $scope.getEmployee($scope.routeParams);
    $scope.thisEmployee = Cache.getItem($routeParams.employeeId);
    
    $scope.experience = Employee.getExperience;

    $scope.newComment = {};
    $scope.addComment = function (obj, txt) {
      Employee.addTxt(obj, txt);
      $scope.newComment = {};
    };

    $scope.removeComment = Employee.removeTxt;

    $scope.showDetails = "show";

    $scope.hideDetails = function() {
      $location.path("/employees/").replace();
    }
  }]);


crewControllers.controller('FaqCtrl', ['$scope', '$http', function($scope, $http) {

  $http.get('options/faqs.json').success(function(data) {
    $scope.faqs = data;
  }); 
}]);