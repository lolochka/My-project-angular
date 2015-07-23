'use strict';

/* App Module */
var crewApp = angular.module('crewApp', ['ngRoute', 'crewControllers', 'crewServices', 'route-segment', 'view-segment', 'ngAnimate']);

crewApp.config(['$routeSegmentProvider', '$routeProvider', 
  function($routeSegmentProvider, $routeProvider) {
    
    $routeSegmentProvider
      .when('/employees',               'employees')
      .when('/employees/:employeeId',   'employees.employeeDetail')
      .when('/about',                   'about')
      .when('/about/first',             'about.s1')
      .when('/about/second',            'about.s2')
      .when('/about/third',             'about.s3')
      .when('/faq',                     'faq')
      .when('/contact',                 'contact')

      .segment('employees', {
        templateUrl: 'partials/employees.html',
        controller: 'EmployeeListCtrl'
      })

      .within()
        .segment('home', {
          default: true,
          templateUrl: 'partials/employees/home.html',
          controller: 'EmployeeDataCtrl'
        })

        .segment('employeeDetail', {
          templateUrl: 'partials/employees/employee-detail.html',
          dependencies:['employeeId'],
          controller: 'EmployeeDataCtrl'
        })

        .up()

      .segment('about', {
        templateUrl: 'partials/about.html',
      })

      .within()
        .segment('s1', {
          default: true,
          templateUrl: 'partials/about/first.html'
        })

        .segment('s2', {
          templateUrl: 'partials/about/second.html'
        })

        .segment('s3', {
          templateUrl: 'partials/about/third.html'
        })

        .up()

      .segment('faq', {
        templateUrl: 'partials/faq.html',
        controller: 'FaqCtrl'
      })

      .segment('contact', {
        templateUrl: 'partials/contact.html'
      })

    $routeProvider.otherwise({redirectTo: '/employees'});
  //   $routeProvider.
  //     when('/employees', {
  //       templateUrl: 'partials/employees.html',
  //       controller: 'EmployeeListCtrl'
  //     }).
  //     when('/employees/:employeeId', {
  //       templateUrl: 'partials/employee-detail.html',
  //       controller: 'EmployeeListCtrl'
  //     }).
      
  //     otherwise({
  //       redirectTo: '/employees'
  //     });
  }
]);