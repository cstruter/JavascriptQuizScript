function QuestionController($scope)
{
	$scope.Questions = Questions;
		
	$scope.CheckAnswers = function()
	{				
		var MyAnswers = [];				
		angular.forEach(this.Questions, function(value, key){
			if (typeof value.Selected != 'undefined') {
				MyAnswers.push(value.Selected);
			}					
		});	
		if (this.Questions.length != MyAnswers.length) {
			alert('Please complete all questions');
			return;
		}
		var Correct = 0;
		for (var i = 0; i < MyAnswers.length; i++) {
			Correct+= (Answers[i] == MyAnswers[i]) ? 1 : 0;
		}
		alert((Correct / MyAnswers.length)*100);
	}
}