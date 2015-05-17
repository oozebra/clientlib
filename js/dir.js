angular.module('commercials',[]).directive('commercials',function(){
                                          
                  return{
                    restrict: 'E',
                    replace: true,
                     scope:{
                         data: '=data',
                        
                     },
                      link: function(scope,element, attrs){
                          element.on("click", function (event) {
                        //    var va = prompt("No of children "+scope.data.no+"\nenter childs age");
                              var time = Number(scope.data.time);
                              var num = Number(scope.data.no);
                              var age = Number(scope.data.ages);
                              var total = 0;
                              var per = 0;
                              var tcost = 0;
                              var ctotal =0;
                                scope.data.pop=time;
                              if(age <= 2){
                                  per = 200;
                                  ctotal = 200*num;
                                  tcost = time*500;
                                  
                                  total = (ctotal+tcost);
                              }else if(age > 2 && age <= 5){
                                   per = 150;
                                  ctotal = 150*num;
                                  tcost = time*500;
                                  
                                 total = (ctotal+tcost);
                              }else if(age > 5 && age <= 10){
                                   per = 300;
                                  ctotal = 300*num;
                                  tcost = time*500;
                                  
                                  total = (ctotal+tcost);
                              }else if(age > 10){
                                   per = 500;
                                  ctotal = 500*num;
                                  tcost = time*500;
                                  
                                  total = (ctotal+tcost);
                              }
                              var percent = total*0.2;
                              var grand = total+percent;
                         //     confirm("Total cost of this comercial is $"+grand);
                              scope.$parent.out=grand;
                        console.log(scope.data.pop);
                              
                              $("#eq").html(grand+".00");
                              $("#ch").html(per+".00");
                              $("#time").html(tcost+".00");
                              $("#ren").html(ctotal+".00");
                          });
                      },
                      templateUrl: "vendor/js/tmp.html",
                      controller: function($scope){
                       
                      }
                  };                        
                                          
            });


