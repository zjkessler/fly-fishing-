'use strict';
var app = angular.module('FishApp');

app.controller('ReportCtrl', ['$scope', 'ReportService', function ($scope, ReportService) {


	$scope.reportList = [];

	(function () {
		ReportService.getReport()
			.then(function (response) {
				$scope.reportList = response;
			});
	}());

	$scope.saveReport = function (report) {
		console.log(report);
		ReportService.newReport(report)
			.then(function (response) {
				console.log(response.data);
				$scope.reportList.push(response.data);
			});
	};
	$scope.removeReport = function (report, index) {
		console.log(index);
		ReportService.removeReport(report)
			.then(function (response) {
				console.log(index);
				$scope.reportList.splice(index, 1);
			});
	};

}]);

app.service('ReportService', ['$http', function ($http) {

	this.getReport = function () {
		return $http.get('/api/report')
			.then(function (response) {
				return response.data;
			}, function (response) {
				console.log('Error' + response.status + ':' + response.statusText);
			});
	};

	this.newReport = function (reportInfo) {
		console.log(reportInfo);
		return $http.post('/api/report', reportInfo)
			.then(function (response) {
				return response.data;
			}, function (response) {
				console.log('Error' + response.status + ':' + response.statusText);
			});
	};
	this.removeReport = function (report) {
		return $http.delete('/api/report/' + report._id)
			.then(function (response) {
				return response.data;
			}, function (response) {
				console.log('Error' + response.status + ':' + response.statusText);
			});
	};
}]);
