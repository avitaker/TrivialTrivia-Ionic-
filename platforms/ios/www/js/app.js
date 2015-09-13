// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('quizApp', ['ionic','angular-svg-round-progress','ngCordova'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#ff0000");
      }
      else {StatusBar.styleDefault();}
    }
  });
}).config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
  $stateProvider
  // .state('tab',{
  //   url:'/tab',
  //   abstract:true,
  //   templateUrl:'templates/tabs.html'
  // })
  // .state('tab.choose',{
  //   url:'/choose',
  //   views:{
  //     'tab-choose':{
  //       templateUrl:'templates/homeTmpl.html',
  //       controller:'StartController'
  //     }
  //   }
  // })
  // .state('tab.quiz',{
  //   url:'/quiz',
  //   views:{
  //     'tab-quiz':{
  //       templateUrl:'templates/quizStateTmpl.html',
  //       controller:'QuizController'
  //     }
  //   }
  // })
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
  })
  .state('statistics',{
    url:'/statistics',
    templateUrl:'templates/statisticsTmpl.html',
    controller:'StatisticsContr'
  })
  .state('instructions',{
    url:'/instructions',
    templateUrl:'templates/instructionsTmpl.html',
  });
  $urlRouterProvider.otherwise('/choose');
}])
// .factory('$localstorage', ['$window', function($window) {
//   return {
//     set: function(key, value) {
//       $window.localStorage[key] = value;
//     },
//     get: function(key, defaultValue) {
//       return $window.localStorage[key] || defaultValue;
//     },
//     setObject: function(key, value) {
//       $window.localStorage[key] = JSON.stringify(value);
//     },
//     getObject: function(key) {
//       return JSON.parse($window.localStorage[key] || '{}');
//     }
//   }
// }])
.factory("Data",function(){
  var factory={};
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
  factory.finalObject=[];
  factory.questionNumberS=0;
  factory.sortCategories=function(arr){
    factory.questionNumberS=0;
    quizObjectJSON=[];
    factory.finalObject=[];
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
    factory.finalObject=randomizeArray(quizObjectJSON);
    factory.answeredQuiz=[];
    factory.answeredQuiz=factory.finalObject;
  }
  return factory;
}).factory("Stats",function(){
  if (!factory){
    var factory={};
  }
  factory.currentQuizPercentage=function(score,total){
    return ((score/total)*100);
  }
  if (!factory.allPercentages){
    factory.allPercentages=[];
    factory.allScores=[];
    factory.allTotals=[];
  }
  // factory.allScores=$localstorage.getObject('allScores');
  // factory.allTotals=$localstorage.getObject('allTotals');
  factory.recordCurrentQuizPercentage=function(score,total){
    factory.allPercentages.push(factory.currentQuizPercentage(score,total));
  }
  factory.determineByQuestionPercentage=function(){
    var scoreSum=0;
    var totalSum=0;
    for (var n=0;n<factory.allScores.length;n++){
      scoreSum+=factory.allScores[n];
      totalSum+=factory.allTotals[n];
    }
    var overallPer=(scoreSum/totalSum)*100;
    return [overallPer,totalSum];
  }
  factory.determineByQuizPercentage=function(){
    var percentSum=0;
    var numberOfQuizzes=factory.allPercentages.length;
    for (var l=0;l<numberOfQuizzes;l++){
      percentSum+=factory.allPercentages[l];
    }
    var overallPer=percentSum/numberOfQuizzes;
    return [overallPer,numberOfQuizzes]
  }
  factory.currentCategoryNum=0;
  factory.scoresByCategory=[{"category":"all","individualScores":[],"correctlyAnswered":0,"wronglyAnswered":0,"unanswered":0,"percentage":0},
  {"category":"trivia","individualScores":[],"correctlyAnswered":0,"wronglyAnswered":0,"unanswered":0,"percentage":0},
  {"category":"science","individualScores":[],"correctlyAnswered":0,"wronglyAnswered":0,"unanswered":0,"percentage":0},
  {"category":"world","individualScores":[],"correctlyAnswered":0,"wronglyAnswered":0,"unanswered":0,"percentage":0},
  {"category":"history","individualScores":[],"correctlyAnswered":0,"wronglyAnswered":0,"unanswered":0,"percentage":0},
  {"category":"economics","individualScores":[],"correctlyAnswered":0,"wronglyAnswered":0,"unanswered":0,"percentage":0}];
  factory.determineIndividualPercents=function(){
    for (var s=0;s<factory.scoresByCategory.length;s++){
      factory.scoresByCategory[s].percentage=((100*factory.scoresByCategory[s].correctlyAnswered)/(factory.scoresByCategory[s].wronglyAnswered+factory.scoresByCategory[s].unanswered+factory.scoresByCategory[s].correctlyAnswered));
    }
  }
  factory.determineBestCategory=function(){
    var best='';
    var highestPer=0;
    for (var l=0;l<factory.scoresByCategory.length;l++){
      if (factory.scoresByCategory[l].percentage>highestPer){
        best=factory.scoresByCategory[l].category;
        highestPer=factory.scoresByCategory[l].percentage;
      }
    }
    return [best,highestPer];
  }
  factory.determineWorstCategory=function(){
    var worst='';
    var lowestPer=100;
    for (var l=0;l<factory.scoresByCategory.length;l++){
      if (factory.scoresByCategory[l].percentage<lowestPer){
        worst=factory.scoresByCategory[l].category;
        lowestPer=factory.scoresByCategory[l].percentage;
      }
    }
    return [worst,lowestPer];
  }
  return factory;

}).directive('questionDiv',function(){
  return{
    restrict:'E',
    replace:false,
    //scope:{questionNumber:'='},
    templateUrl:'templates/questionDivTmpl.html',
  }
}).controller('stateChange',['$scope','$state',function($scope,$state){
  $scope.setPage=function(page){
    $state.transitionTo(page)
  }
}]).controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }
}).controller("StartController",['$scope','$state','Data','$ionicPopover',function($scope,$state,Data,$ionicPopover){
  $scope.finalCategors=[{"category":"all"},{"category":"trivia"},{"category":"science"},{"category":"world"},{"category":"history"},{"category":"economics"}];
  $scope.thisIsIt=[];
  $scope.thisIsSelected;
  $scope.goInstructions=function(){
    $state.go('instructions');
  }
  $scope.whichCategory=function(){
    for (var s=0;s<$scope.finalCategors.length;s++){
      if (!$scope.finalCategors[s].chosen) {continue;}
      else {$scope.thisIsIt.push($scope.finalCategors[s].category);}
    }
  }

  $scope.setPage=function(page){
    $state.transitionTo(page);
  }

  $scope.lengthPopover;

  $ionicPopover.fromTemplateUrl('templates/quizLengthPopover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.lengthPopover = popover;
  });

  $scope.killPopover=function(){
    $scope.lengthPopover.hide();
    $scope.lengthPopover.remove();
    $state.transitionTo('quiz');
  }

  $scope.startQuiz=function(){
    $scope.thisIsIt=[];
    $scope.whichCategory();
    Data.sortCategories(["all"]);
    $scope.lengthPopover.show();
    //$state.transitionTo('quiz');
  }
}]).controller('QuizController',['$scope','Data','$state','$rootScope','$ionicPopup','Stats','$interval',"$timeout","$cordovaVibration",function($scope,Data,$state,$rootScope,$ionicPopup,Stats,$interval, $timeout,$cordovaVibration){
  $scope.moneyOptions=Data.moneyOptions;
  $scope.timeLimit;
  $scope.timeOut=function(){
    if ($scope.isQuizActive===true){
      $scope.timeLimit=$timeout(
        function(){
          $scope.nextButtonOnclick();
        },
        20000
      );
    }
    else {$timeout.cancel($scope.timeLimit);}
  }
  $scope.restartTimeout=function(){
    $timeout.cancel($scope.timeLimit);
    $scope.timeLimit=undefined;
    $scope.timeOut();
  }
  $scope.timer=0;
  var timerInterval;
  $scope.runTimer=function(){
    $scope.timer=0;
    timerInterval=$interval(
      function(){
        $scope.timer+=1;
      },
      1000,
      20
    );
  };
  $scope.restartTimer=function(){
    $interval.cancel(timerInterval);
    timerInterval=undefined;
    $scope.runTimer();
  }
  $scope.noCategory=false;
  if (Data.finalObject.length===0){$scope.noCategory=true;}
  $scope.restartQuiz=function(){
    $scope.questionNumber=Data.questionNumberS;
    $scope.progress=0-(0-$scope.quizObjectJSON.length);
    $scope.isQuizActive=true;
    $scope.scoreQuizNow=false;
    $scope.quizIsDone=false;
    $scope.finalScore=0;
    $scope.anyWrong=false;
    $scope.anyMissed=false;
    $scope.perfectQuiz=false;
    $scope.wrongAnswers=[];
    $scope.notAnswereds=[];
    Stats.currentFinalScore=0;
    Stats.currentNumQuestions=0;
    $scope.restartTimer();
    $scope.restartTimeout();
  }
  $scope.setNewTopic=function(){
      $scope.answeredQuiz=Data.finalObject;
      $scope.quizObjectJSON=Data.finalObject;
      $scope.restartQuiz();
  }
  $scope.setNewTopic();
  // $scope.$watch(function(Data){return Data.finalObject},
  //   function(){
  //     for (var l=0;l<$scope.answeredQuiz.length;l++){
  //       $scope.answeredQuiz[l].userAnswer=null;
  //     }
  //     $scope.restartQuiz();
  // });
  $rootScope.$on("$stateChangeStart",
      function(){
        for (var l=0;l<$scope.answeredQuiz.length;l++){
          $scope.answeredQuiz[l].userAnswer=null;
        }
        // $scope.setNewTopic();
  });
  $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Skip question?',
       template: 'Are you sure you want to continue without choosing an answer?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         $scope.questionNumber++; goOn=true;
       }
       else {
       }
     });
   };
  //  var rotation =0;
  $scope.moveOn=function(){
    var goOn=false;
    $scope.isQuizActive=true;
    if ($scope.questionNumber<$scope.quizObjectJSON.length) {
      if ($scope.answeredQuiz[$scope.questionNumber].userAnswer===Data.finalObject[$scope.questionNumber].correctAnswer){
        if (!$scope.answeredQuiz[$scope.questionNumber].userAnswer){
          if ($scope.answeredQuiz[$scope.questionNumber].userAnswer===0){
            $scope.questionNumber++;
            goOn=true;
          }
          else {
            $scope.showConfirm();
          }
        }
        else {$scope.questionNumber++;goOn=true;}
      }
      else {
        goOn=true;
        $scope.isQuizActive=false;
        $scope.scoreQuizNow=true;
        for (var i=0;i<Data.answeredQuiz.length;i++){
          if (Data.answeredQuiz[i].userAnswer===Data.answeredQuiz[i].correctAnswer){
            $scope.finalScore+=1;
            for (var l=0;l<Stats.scoresByCategory.length;l++){
              if (Data.answeredQuiz[i].category===Stats.scoresByCategory[l].category){
                Stats.scoresByCategory[l].correctlyAnswered+=1;
              }
              else {continue;}
            }
          }
          else if (Data.answeredQuiz[i].userAnswer!=Data.answeredQuiz[i].correctAnswer && Data.answeredQuiz[i].userAnswer!=null|undefined){
            $scope.wrongAnswers.push(Data.answeredQuiz[i]);
            $scope.anyWrong=true;
            for (var l=0;l<Stats.scoresByCategory.length;l++){
              if (Data.answeredQuiz[i].category===Stats.scoresByCategory[l].category){
                Stats.scoresByCategory[l].wronglyAnswered+=1;
              }
              else {continue;}
            }
          }
          else {
            $scope.notAnswereds.push(Data.answeredQuiz[i]);
            $scope.anyMissed=true;
            for (var l=0;l<Stats.scoresByCategory.length;l++){
              if (Data.answeredQuiz[i].category===Stats.scoresByCategory[l].category){
                Stats.scoresByCategory[l].unanswered+=1;
              }
              else {continue;}
            }
          }
        }
        Stats.recordCurrentQuizPercentage($scope.finalScore,Data.answeredQuiz.length);
        Stats.allScores.push($scope.finalScore);
        Stats.allTotals.push(Data.answeredQuiz.length);
        Stats.determineIndividualPercents();
        for (var j=0;j<Stats.scoresByCategory.length;j++){
          Stats.scoresByCategory[j].individualScores.push({"score":$scope.finalScore,"totalQuestions":$scope.wrongAnswers.length+$scope.notAnswereds.length})
        }
        $scope.scoreQuizNow=true;
        $scope.isQuizDone=true;
        if ($scope.finalScore===10){$scope.perfectQuiz=true;}
      }
    }
    $scope.$watch(function(scope){return scope.answeredQuiz},
      function(){Data.answeredQuiz=$scope.answeredQuiz});
    $scope.progress=0-($scope.questionNumber-$scope.quizObjectJSON.length);
    return goOn;
  }
  $scope.flipToBack=function(){
    // console.log('to back');
    angular.element(questionContainer).addClass('flip');
    angular.element(cardContent).removeClass('front');
    $scope.moveOn();
    angular.element(cardContent).addClass('back');
  }
  $scope.flipToFront=function(){
    // console.log('to front');
    angular.element(questionContainer).addClass('flip');
    angular.element(cardContent).removeClass('back');
    angular.element(cardContent).addClass('front');
    angular.element(questionContainer).removeClass('flip');
    $scope.moveOn();
  }
  $scope.doTheFlip=function(){
    if (angular.element(cardContent).hasClass('front')){
      return $scope.flipToBack();
      // $scope.flipToggle=true;
    }
    else {
      return $scope.flipToFront();
      // $scope.flipToggle=false;
      // angular.element(questionContainer).toggleClass('flip');
    }
  }

  $scope.nextButtonOnclick=function(){
    $scope.doTheFlip();
    // $cordovaVibration.vibrate(70);
    $scope.restartTimer();
    $scope.restartTimeout();

  }
}]).controller('AcknowledgementsContr',function($scope,Data){
    $scope.thankYou=Data;
}).controller('StatisticsContr',['$scope','$rootScope','Stats',function($scope,$rootScope,Stats){
  $scope.startThisUp=function(){
    $scope.byQuestionPercentages=Stats.determineByQuestionPercentage();
    $scope.byQuestionPercentage=$scope.byQuestionPercentages[0];
    $scope.byQuestionTotal=$scope.byQuestionPercentages[1];
    $scope.byQuizPercentages=Stats.determineByQuizPercentage();
    $scope.overallPercentage=$scope.byQuizPercentages[0];
    $scope.totalQuizzes=$scope.byQuizPercentages[1];
    $scope.bestCategoryInfo=Stats.determineBestCategory();
    $scope.bestCategory=$scope.bestCategoryInfo[0];
    $scope.bestCategoryPercent=$scope.bestCategoryInfo[1];
    $scope.worstCategoryInfo=Stats.determineWorstCategory();
    $scope.worstCategory=$scope.worstCategoryInfo[0];
    $scope.worstCategoryPercent=$scope.worstCategoryInfo[1];
  }
  $scope.startThisUp();
  $rootScope.$on('$stateChangeStart',
    function(){
      $scope.startThisUp();
    });
}])
