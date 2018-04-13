angular.module('export-to-csv', ['ngRoute',
        'export-to-csv.index',
        'export-to-csv.myService',
        'ngSanitize', 'ngCsv'
        ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/index'
        });
    }]);
