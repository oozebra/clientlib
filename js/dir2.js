angular.module('childern',[]).directive('childern',function(){
                                          
                  return{
                    restrict: 'E',
                    replace: true,
                     scope:{
                         data: '=data',
                        
                     },
                      link: function(scope,element, attrs){
                          element.on("click", function (event) {
                        // 
                          });
                      },
                      templateUrl: "vendor/js/child.html",
                      controller: function($scope){
                       
                      }
                  };                        
                                          
            });