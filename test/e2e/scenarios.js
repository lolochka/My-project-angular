'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Crew App', function() {

	it ('should redirect index.html to index.html#/employees', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/employees');
      });
  });

	describe('Employee list view', function() {

		beforeEach(function() {
			browser.get('app/index.html#/employees');
		});

		var employeeList = element.all(by.repeater('employee in employees'));
		var query = element(by.model('query'));

		it('should filter the employee list as an user types into the searchbox', function () {

			var employeeList = element.all(by.repeater('employee in employees'));
			var query = element(by.model('query'));

			expect(employeeList.count()).toBe(5);

			query.sendKeys('developer');
			expect(employeeList.count()).toBe(3);

			query.clear();
			query.sendKeys('masha');
			expect(employeeList.count()).toBe(1);
		});


		it('should render employees specific links', function() {
      var query = element(by.model('query'));
      query.sendKeys('masha');
      element(by.css('.block-employees_list li a')).click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/employees/1436206236945');
      });
    });

	});

	describe('Emplyee detail view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/employees/1436379882290');
    });


    it('should display placeholder page with employeeId', function() {
      expect(element(by.binding('employeeId')).getText()).toBe('1436379882290');
    });
  });
});