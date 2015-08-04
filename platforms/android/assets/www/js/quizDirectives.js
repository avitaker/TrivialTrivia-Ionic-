quizApp.directive('questionDiv',function(){
  return{
    restrict:'E',
    replace:false,
    //scope:{questionNumber:'='},
    templateUrl:'questionDivInline.html',
  }
})
