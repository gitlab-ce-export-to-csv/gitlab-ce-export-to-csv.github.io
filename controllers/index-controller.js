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


        MyService.get().then(function (response) {
            $scope.groups = response.data;
            console.log($scope.groups);
        });

        $scope.$watch('user.token', function (newValue) {
            if (newValue && newValue != "") {
                if (newValue.length > 15) {
                    $scope.getGroups();
                }
            }
        });

        $scope.$watch('groupsToExport', function (newValue) {
            if (newValue && newValue != "") {
                $scope.load = true;
                $scope.getAllIssues(newValue);
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

        $scope.getGroups = function () {
            MyService.get($scope.user.token, $scope.user.url).then(function (response) {
                $scope.groups = response.data;
            });
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