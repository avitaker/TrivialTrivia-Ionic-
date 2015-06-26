// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('quizApp', ['ionic'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleBlackTranslucent();
    }
    // $cordovaStatusbar.overlaysWebView(true);

    // $cordovaStatusBar.style(1);
    // $cordovaStatusbar.styleColor('black');
  });
}).config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}]).config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('choose',{
    url:'/choose',
    templateUrl:'templates/homeTmpl.html',
    controller:'StartController'
  })
  .state('quiz',{
    url:'/quiz',
    templateUrl:'templates/quizStateTmpl.html',
    controller:'QuizController'
  })
  .state('acknowledgements',{
    url:'/acknowledgements',
    templateUrl:'templates/acknowledgementsTmpl.html',
    controller:'AcknowledgementsContr'
  });
  $urlRouterProvider.otherwise('/choose');
}]).service("Data",function(){
  var quizObjectRaw=[{"category":"trivia","question": "Grand Central Terminal, Park Avenue, New York is the world's", "choices": ["largest railway station","highest railway station","longest railway station","None of the above"], "correctAnswer":0},
  {"category":"science","question": "Entomology is the science that studies", "choices": ["Behavior of human beings","Insects","The origin and history of technical and scientific terms","the formation of rocks"], "correctAnswer":1},
  {"category":"world","question": "Eritrea, which became the 182nd member of the UN in 1993, is in the continent of", "choices": ["Asia","Europe","Africa","Australia"], "correctAnswer":2},
  {"category":"world","question": "Garampani sanctuary is located in the Indian town of", "choices": ["Diphu, Assam","Junagarh, Gujarat","Gangtok, Sikkim","Kohima, Nagaland"], "correctAnswer":0},
  {"category":"trivia","question": "For which of the following disciplines is Nobel Prize awarded?", "choices": ["Physics and Chemistry","Literature, Peace and Economics","Physiology or Medicine","All of the above"], "correctAnswer":3},
  {"category":"history","question": "Hitler's party, which came into power in 1933, is known as", "choices": ["Ku-Klux-Klan","Labour Party","Democratic Party","Nazi Party"], "correctAnswer":3},
  {"category":"science","question": "Galileo was an Italian astronomer who", "choices": ["discovered four satellites of Jupiter","discovered that the movement of pendulum produces a regular time measurement","developed the telescope","All of the above"], "correctAnswer":3},
  {"category":"science","question": "Exposure to sunlight helps improve a person's health because", "choices": ["resistance power increases","the ultraviolet rays convert skin oil into Vitamin D","the infrared light kills bacteria in the body","the pigment cells in the skin get stimulated and produce a healthy tan"], "correctAnswer":1},
  {"category":"history","question": "First China War was fought between", "choices": ["China and Britain","China and France","China and Egypt","China and Greece"], "correctAnswer":0},
  {"category":"world","question": "Famous Indian sculptures depicting art of love built some time in 950 AD - 1050 AD are at", "choices": ["Mahabalipuram temples","Jama Masjid","Khajuraho temples","Sun temple"], "correctAnswer":2}, 
  {"category":"economics","question":"In economics, dumping is","choices":["selling of goods abroad at a price well below the production cost at the home market price","the process by which the supply of a manufacture's product remains low in the domestic market, which batches him better price","prohibited by regulations of GATT","All of the above"],"correctAnswer":3},
  {"category":"science","question":"Friction can be reduced by changing from","choices":["sliding to rolling","rolling to sliding","potential energy to kinetic energy","dynamic to static"],"correctAnswer":0},
  //{"category":"history","question":"During World War II, when did Germany attack France?","choices":["1915","1940","1943","1962"],"correctAnswer":1},
  {"category":"science","question":"The ozone layer restricts which of the following types of radiation?","choices":["Visible light","Infrared radiation","X-rays and gamma rays","Ultraviolet radiation"],"correctAnswer":3},
  {"category":"history","question":"During World War II, when did Germany attack France?","choices":["1915","1940","1943","1962"],"correctAnswer":1},
  {"category":"trivia","question":"Eugenics is the study of","choices":["people of European origin","different races of mankind","altering human beings by changing their genetic components","genetics of plants"],"correctAnswer":2},
  {"category":"science","question":"Escape velocity of a rocket fired from the earth towards the moon is a velocity to get rid of the","choices":["Moon's gravitational pull","Earth's gravitational pull","Centripetal force due to the earth's rotation","Pressure of the atmosphere"],"correctAnswer":1},
  {"category":"history","question":"Hamid Karzai was chosen president of Afghanistan in","choices":["2002","1978","2010","1899"],"correctAnswer":0},
  {"category":"world","question":"Headquarters of UNO are located at","choices":["Geneva (Switzerland)","Paris (France)","Hague (Netherlands)","New York (USA)"],"correctAnswer":3},
  {"category":"trivia","question":"For seeing objects at the surface of water from a submarine under water, the instrument used is","choices":["telescope","spectroscope","periscope","noScope 360"],"correctAnswer":2}];
  var quizObjectJSON=[];
  var randomizeArray=function(targetArr){
    var returnArray=[];
    while (returnArray.length<targetArr.length){
      var shouldAdd=true;
      var lastInstance=targetArr[Math.floor(Math.random()*targetArr.length)];
      if (returnArray.length===0){returnArray.push(lastInstance);}
      else {
        for (var s=0;s<returnArray.length;s++){
          if (lastInstance.question===returnArray[s].question){
            shouldAdd=false;
          }
        }
        if (shouldAdd===true){
          returnArray.push(lastInstance);
        }
      }
    }
    return returnArray;
  }
  this.finalObject=[];
  this.questionNumberS=0;
  this.sortCategories=function(arr){
    this.questionNumberS=0;
    quizObjectJSON=[];
    this.finalObject=[];
    for (var i=0;i<arr.length;i++){
      if (arr[i]==='all'){
        quizObjectJSON=quizObjectRaw;
        break;
      }
      else{
        for (var v=0;v<quizObjectRaw.length;v++){
          if (quizObjectRaw[v].category===arr[i]){
            quizObjectJSON.push(quizObjectRaw[v]);
          }
          else {continue;}
        }
      }
    }
    this.finalObject=randomizeArray(quizObjectJSON);
    this.answeredQuiz=[];
    this.answeredQuiz=this.finalObject;
  }
}).controller('stateChange',['$scope','$state',function($scope,$state){
  $scope.setPage=function(page){
    $state.transitionTo(page)
  }
}]).controller("StartController",['$scope','$state','Data',function($scope,$state,Data){
  $scope.finalCategors=[{"category":"all"},{"category":"trivia"},{"category":"science"},{"category":"world"},{"category":"history"},{"category":"economics"}];
  $scope.thisIsIt=[];
  $scope.thisIsSelected;
  $scope.whichCategory=function(){
    for (var s=0;s<$scope.finalCategors.length;s++){
      if (!$scope.finalCategors[s].chosen) {continue;}
      else {$scope.thisIsIt.push($scope.finalCategors[s].category);}
    }
  }

  $scope.startQuiz=function(){
    $scope.thisIsIt=[];
    $scope.whichCategory();
    Data.sortCategories($scope.thisIsIt);
    $scope.setPage('quiz');
    
  }
}]).controller('QuizController',['$scope','Data',function($scope,Data){
  $scope.quizObjectJSON=Data.finalObject;
  $scope.questionNumber=Data.questionNumberS;
  $scope.isQuizActive=true;
  $scope.scoreQuizNow=false;
  $scope.quizIsDone=false;
  $scope.finalScore=0;
  $scope.anyWrong=false;
  $scope.anyMissed=false;
  $scope.perfectQuiz=false;
  $scope.wrongAnswers=[];
  $scope.notAnswereds=[];
  $scope.nextButtonOnclick=function(){
    var goOn=false;
    $scope.isQuizActive=true;
    if ($scope.questionNumber<$scope.quizObjectJSON.length) { 
      if (Data.answeredQuiz[$scope.questionNumber].userAnswer){
        if (Data.answeredQuiz[$scope.questionNumber].userAnswer===0){
          $scope.questionNumber++;
          goOn=true;
        }
        else if (Data.answeredQuiz[$scope.questionNumber].userAnswer===null|undefined){
          var noAnswer=window.confirm('Are you sure you want to continue without choosing an answer?');
          if (noAnswer===true){$scope.questionNumber++; goOn=true;}
        }
      }
      else {$scope.questionNumber++;goOn=true;}
    }
    return goOn;
  }
  $scope.backButtonOnclick=function(){
    $scope.questionNumber=0;
  }
  $scope.finishButtonOnclick=function(){
    if ($scope.nextButtonOnclick()){
      $scope.isQuizActive=false;
      for (var i=0;i<Data.answeredQuiz.length;i++){
        if (Data.answeredQuiz[i].userAnswer===Data.answeredQuiz[i].correctAnswer){
          $scope.finalScore+=1;
        }
        else if (Data.answeredQuiz[i].userAnswer!=Data.answeredQuiz[i].correctAnswer && Data.answeredQuiz[i].userAnswer!=null|undefined){
          $scope.wrongAnswers.push(Data.answeredQuiz[i]);
          $scope.anyWrong=true;
        }
        else {
          $scope.notAnswereds.push(Data.answeredQuiz[i]);
          $scope.anyMissed=true;
        }
      }
      $scope.scoreQuizNow=true;
      $scope.isQuizDone=true;
      if ($scope.finalScore===10){$scope.perfectQuiz=true;}
    }
  }
}]).controller('AcknowledgementsContr',function($scope,Data){
    $scope.thankYou=Data;
}).directive('questionDiv',function(){
  return{
    restrict:'E',
    replace:true,
    //scope:{questionNumber:'='},
    templateUrl:'templates/questionDivTmpl.html',
  }
})

