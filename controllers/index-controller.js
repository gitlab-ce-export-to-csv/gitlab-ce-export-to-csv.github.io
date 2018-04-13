angular.module('export-to-csv.index', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/index', {
            templateUrl: 'views/index.html',
            controller: 'IndexController'
        });
    }])
    .controller('IndexController', function ($scope, MyService, $q) {
        $scope.exportButton = false;
        $scope.issues = [];
        $scope.load = false;

        $scope.$watch('user.token', function (newValue) {
            if (newValue && newValue != "") {
                if (newValue.length > 15) {
                    $scope.getGroups();
                }
            }
        });


        $scope.$watch('state', function (newValue) {
            if (newValue && newValue != "" && $scope.groupsToExport && $scope.groupsToExport != "") {
                $scope.load = true;
                $scope.exportButton = false;
                switch (newValue) {
                    case "all":
                        $scope.issues = [];
                        $scope.getAllIssues($scope.groupsToExport);
                        break;
                    case "opened":
                        $scope.issues = [];
                        $scope.getOpenedIssues($scope.groupsToExport);
                        break;
                    case "closed":
                        $scope.issues = [];
                        $scope.getClosedIssues($scope.groupsToExport);
                        break;

                }
            }
        });

        $scope.getAllIssues = function (newValue, page = 1) {
            MyService.getAllIssues($scope.user.token, newValue, page, $scope.user.url).then(function (response) {
                $scope.issues = $scope.issues.concat(response.data);
                var nextPage = response.headers('x-next-page');
                if (nextPage != "") {
                    $scope.getAllIssues(newValue, nextPage);
                } else {
                    $scope.exportButton = true;
                    $scope.load = false;
                }
            });
        }

        $scope.getOpenedIssues = function (newValue, page = 1) {
            MyService.getOpenedIssues($scope.user.token, newValue, page, $scope.user.url).then(function (response) {
                $scope.issues = $scope.issues.concat(response.data);
                var nextPage = response.headers('x-next-page');
                if (nextPage != "") {
                    $scope.getOpenedIssues(newValue, nextPage);
                } else {
                    $scope.exportButton = true;
                    $scope.load = false;
                }
            });
        }

        $scope.getClosedIssues = function (newValue, page = 1) {
            MyService.getClosedIssues($scope.user.token, newValue, page, $scope.user.url).then(function (response) {
                $scope.issues = $scope.issues.concat(response.data);
                var nextPage = response.headers('x-next-page');
                if (nextPage != "") {
                    $scope.getClosedIssues(newValue, nextPage);
                } else {
                    $scope.exportButton = true;
                    $scope.load = false;
                }
            });
        }

        $scope.getGroups = function () {
            MyService.get($scope.user.token, $scope.user.url).then(function (response) {
                $scope.groups = response.data;
            }, function (error) { $scope.message = error.data.message });
        }

        $scope.getArray = function () {
            var myArr = [];
            var d = $scope.issues;
            for (var i = 0; i < d.length; i++) {
                var labels = "";
                if (d[i].labels.length > 1) {
                    for (var j in d[i].labels) {
                        labels = labels + " " + d[i].labels[j];
                    }
                } else {
                    labels = d[i].labels[0];
                }
                var assigneeName = "";
                var assigneeUserName = "";
                if (d[i].assignee) {
                    assigneeName = d[i].assignee.name;
                    assigneeUserName = d[i].assignee.username;
                }

                myArr.push([d[i].title, d[i].description, d[i].state, d[i].created_at, d[i].updated_at, d[i].closed_at, labels,
                d[i].author.name, d[i].author.username, assigneeName, assigneeUserName, d[i].duo_date]);
            }

            return myArr;
        }
    });