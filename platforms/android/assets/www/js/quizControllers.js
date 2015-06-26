quizApp.controller("MainController",['$scope',function($scope){
  $scope.quizObjectJSON=[{"question": "Grand Central Terminal, Park Avenue, New York is the world's", "choices": ["largest railway station","highest railway station","longest railway station","None of the above"], "correctAnswer":0},
  {"question": "Entomology is the science that studies", "choices": ["Behavior of human beings","Insects","The origin and history of technical and scientific terms","the formation of rocks"], "correctAnswer":1},
  {"question": "Eritrea, which became the 182nd member of the UN in 1993, is in the continent of", "choices": ["Asia","Europe","Africa","Australia"], "correctAnswer":2},
  {"question": "Garampani sanctuary is located in the Indian town of", "choices": ["Diphu, Assam","Junagarh, Gujarat","Gangtok, Sikkim","Kohima, Nagaland"], "correctAnswer":0},
  {"question": "For which of the following disciplines is Nobel Prize awarded?", "choices": ["Physics and Chemistry","Literature, Peace and Economics","Physiology or Medicine","All of the above"], "correctAnswer":3},
  {"question": "Hitler's party, which came into power in 1933, is known as", "choices": ["Ku-Klux-Klan","Labour Party","Democratic Party","Nazi Party"], "correctAnswer":3},
  {"question": "Galileo was an Italian astronomer who", "choices": ["discovered four satellites of Jupiter","discovered that the movement of pendulum produces a regular time measurement","developed the telescope","All of the above"], "correctAnswer":3},
  {"question": "Exposure to sunlight helps a person improve his health because", "choices": ["resistance power increases","the ultraviolet rays convert skin oil into Vitamin D","the infrared light kills bacteria in the body","the pigment cells in the skin get stimulated and produce a healthy tan"], "correctAnswer":1},
  {"question": "First China War was fought between", "choices": ["China and Britain","China and France","China and Egypt","China and Greece"], "correctAnswer":0},
  {"question": "Famous Indian sculptures depicting art of love built some time in 950 AD - 1050 AD are at", "choices": ["Mahabalipuram temples","Jama Masjid","Khajuraho temples","Sun temple"], "correctAnswer":2}];
  $scope.answeredQuiz=$scope.quizObjectJSON;
  $scope.title="Avi's quiz";
  $scope.questionNumber=-1;
  $scope.hideWelcomeDiv=false;
  $scope.isQuizActive=false;
  $scope.scoreQuizNow=false;
  $scope.quizIsDone=false;
  $scope.finalScore=0;
  $scope.wrongAnswers=[];
  $scope.notAnswereds=[];
  $scope.nextButtonOnclick=function(){
    var goOn=false;
    $scope.hideWelcomeDiv=true;
    $scope.isQuizActive=true;
    if ($scope.questionNumber===-1){
      $scope.questionNumber++;
    }
    else { 
      if (!$scope.answeredQuiz[$scope.questionNumber].userAnswer){
        if ($scope.answeredQuiz[$scope.questionNumber].userAnswer===0){
          $scope.questionNumber++;
          goOn=true;
        }
        else {
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
      for (var i=0;i<$scope.answeredQuiz.length;i++){
        if ($scope.answeredQuiz[i].userAnswer===$scope.answeredQuiz[i].correctAnswer){
          $scope.finalScore+=1;
        }
        else if ($scope.answeredQuiz[i].userAnswer!=$scope.answeredQuiz[i].correctAnswer && $scope.answeredQuiz[i].userAnswer!=null|undefined){
          $scope.wrongAnswers.push($scope.answeredQuiz[i]);
        }
        else {
          $scope.notAnswereds.push($scope.answeredQuiz[i]);
        }
      }
      $scope.scoreQuizNow=true;
      $scope.isQuizDone=true;
    }
  }
}])
