'use strict';

/* App Module */
var crewApp = angular.module('crewApp', ['ngRoute', 'crewControllers', 'crewServices']);

crewApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/employees', {
        templateUrl: 'partials/employees.html',
        controller: 'EmployeeListCtrl'
      }).
      when('/employees/:employeeId', {
        templateUrl: 'partials/employee-detail.html',
        controller: 'EmployeeListCtrl'
      }).
      
      otherwise({
        redirectTo: '/employees'
      });
  }
]);