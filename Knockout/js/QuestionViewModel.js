function QuestionViewModel() {
	this.Questions = ko.observableArray(Questions).extend({ paging: 3 });

	this.CheckAnswers = function () {
		var MyAnswers = [];					
		ko.utils.arrayForEach(this.Questions(), function(item)
		{
			if (item.Selected != '') {
				MyAnswers.push(item.Selected);
			}						
		});					
		if (this.Questions().length != MyAnswers.length) {
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

var PageViewModel = new QuestionViewModel();

ko.applyBindings(PageViewModel);