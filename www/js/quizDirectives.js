quizApp.directive('questionDiv',function(){
  return{
    restrict:'E',
    replace:true,
    //scope:{questionNumber:'='},
    templateUrl:'questionDivInline.html',
  }
})
