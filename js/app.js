var app = angular.module("app", ['ngRoute','commercials','childern']) //ngRoute used to implement the $routeProvider Object

app.config(function($routeProvider){
    $routeProvider.when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginController'
    });
    
    $routeProvider.when('/home', {
        templateUrl: 'home.html',
        controller: 'HomeController'
    });
    
    $routeProvider.when('/contact', {
        templateUrl: 'contact.html',
        controller: 'ContactController'
    });
    
    $routeProvider.when('/services', {
        templateUrl: 'services.html',
        controller: 'ServicesController',
        resolve: {
            auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
            var userInfo = document.cookie;
 
            if (userInfo) {
                return $q.when(userInfo);
            } 
            else {
                return $q.reject({ authenticated: false });
                }
            }]
        }
    });
    
    $routeProvider.when('/viewChildren', {
        templateUrl: 'viewChildren.html',
        controller: 'viewChildrenController'
    });
    
    $routeProvider.when('/browse', {
        templateUrl: 'browse.html',
        controller: 'browseController'
    });
    
    $routeProvider.otherwise({redirectTo : '/home'});
}); // end app module

app.run(["$rootScope", "$location", function ($rootScope, $location) {

    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
        //console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/login");
        }
    });
}]);

//using the factory service to act as an interface for logging in
app.factory("authenticationSvc", function($http,$location, $q, $window) {
  return{
     login: function(credentials){
        $.getJSON( "logCed.json", function( data ) {
        var bool = false;
        $.each( data, function( key, val ) {
            if(val.uname == credentials.username && val.pass==credentials.password){
                bool=true;
                document.cookie="username="+credentials.username;
                $location.path('/services');
            }

        });
            
        if(!bool){
            alert("Invalid Credentials");
        }
        });
     }
    }
});

app.controller("LoginController", ["$scope", "$location", "$window", "authenticationSvc",function ($scope, $location, $window, authenticationSvc) {
    
    $scope.credentials = {
        username: "",
        password: ""
    };
    
    $scope.login = function(){
        authenticationSvc.login($scope.credentials);
    };
}]);//end LoginController



app.controller('HomeController', function($scope, $location){
    
}); //end HomeController

app.controller('ContactController', function($scope){

}); //end ContactController

app.controller('viewChildrenController', function($scope){

}); //end viewChildrenController

app.controller('browseController', function($scope, $http){

    var url = "comercials.txt";
     $http.get(url).success(function(r){$scope.profiles = r;});
    $scope.out="";
    $scope.h = {};
                $scope.h.hideShow = function(event) {
                    //js action happens here!!!
                    $("#cal").toggle();
                    $(".cash").html("");
                    
                }
    
}); //end browseController

//childern prfile controller
 app.controller('profileController', function($scope, $http){
    var url = "profile.txt";
    $http.get(url).success(function(r){$scope.profiles = r;});
});


app.controller('ServicesController', function($scope){
    $scope.message = "Mouse over boxes to see more info";
}); //end ServicesController

//evoking jQueryLite under the hood
app.directive('showsMessageWhenHovered', function(){
    return{
        restrict: "A",
        link: function(scope, element, attributes){ //binds directive and DOM element with this function
            var originalMessage = scope.message;
            element.bind("mouseover", function(){
                scope.message = attributes.message;
                scope.$apply();
            });
            element.bind("mouseout", function() {
                scope.message = originalMessage;
                scope.$apply();
            });
        }
    };
}); //end app.directive



