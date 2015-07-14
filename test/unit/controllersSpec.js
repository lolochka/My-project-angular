'use strict';

/* jasmine specs for controllers go here */
describe('Crew controllers', function() {

    describe('EmployeeListCtrl', function(){
        var scope, ctrl, $httpBackend;

        // Load our app module definition before each test.
        beforeEach(module('crewApp'));

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service in order to avoid a name conflict.
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('employees/employees.json').respond([{"name":"Alex"}, {"name":"Andrew"}]);

        scope = $rootScope.$new();
        ctrl = $controller('EmployeeListCtrl', {$scope: scope});
        }));

        it('should create "employees" model with 2 employees fetched from xhr', function() {
            expect(scope.employees).toBeUndefined();
            $httpBackend.flush();

            expect(scope.employees).toEqual([{"name":"Alex"}, {"name":"Andrew"}]);
     });
    });
});