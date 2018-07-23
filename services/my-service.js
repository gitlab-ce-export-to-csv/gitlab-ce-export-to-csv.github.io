angular.module('export-to-csv.myService', ['ngRoute', 'ngResource']).
service('MyService', ['$http', function($http) {
     var urlGlobal = "https://gitlab.com";

     this.get = function(token, url){
        url = url || urlGlobal;
        return $http.get(url + "/api/v4/groups?per_page=100", { headers: {
            'PRIVATE-TOKEN': token
          }});
     };


    this.getAllIssues = function(token, id, page = 1, url){
        url = url || urlGlobal;
        return $http.get(url + "/api/v4/groups" + "/" + id + "/issues?scope=all&per_page=100&page=" + page, { headers: {
            'PRIVATE-TOKEN': token
          }});
     };

     this.getClosedIssues = function(token, id, page = 1, url){
        url = url || urlGlobal;
        return $http.get(url + "/api/v4/groups" + "/" + id + "/issues?scope=all&per_page=100&state=closed&page=" + page, { headers: {
            'PRIVATE-TOKEN': token
          }});
     };

     this.getOpenedIssues = function(token, id, page = 1, url){
        url = url || urlGlobal;
        return $http.get(url + "/api/v4/groups" + "/" + id + "/issues?scope=all&per_page=100&state=opened&page=" + page, { headers: {
            'PRIVATE-TOKEN': token
          }});
     };


     this.getAllIssuesWithMilestone = function(token, id, page = 1, url, milestone){
        url = url || urlGlobal;
        return $http.get(url + "/api/v4/groups" + "/" + id + "/issues?milestone="+milestone+"&scope=all&per_page=100&page=" + page, { headers: {
            'PRIVATE-TOKEN': token
          }});
     };

     this.getClosedIssuesWithMilestone = function(token, id, page = 1, url, milestone){
        url = url || urlGlobal;
        return $http.get(url + "/api/v4/groups" + "/" + id + "/issues?milestone="+milestone+"&scope=all&per_page=100&state=closed&page=" + page, { headers: {
            'PRIVATE-TOKEN': token
          }});
     };

     this.getOpenedIssuesWithMilestone = function(token, id, page = 1, url, milestone){
        url = url || urlGlobal;
        return $http.get(url + "/api/v4/groups" + "/" + id + "/issues?milestone="+milestone+"&scope=all&per_page=100&state=opened&page=" + page, { headers: {
            'PRIVATE-TOKEN': token
          }});
     };

     

 }]);