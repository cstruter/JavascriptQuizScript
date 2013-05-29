/*	
	Simple Javascript Quiz Version 1.2
	Copyright (c) 2004-2012 CS Truter
	Written by Christoff Truter
	email: Christoff@cstruter.com - (Please let me know if you intend to use the script) 
	Updated: 2012/04/16
*/
	
var Answers = new Array();

window.onload = function()
{
	var oldString=GetCookie("questions");
	var template = document.getElementById('results');

	if (oldString != undefined)
	{
		if (oldString.length > 0)
		{
			var correct = 0;
			var output = '';
			var data = oldString.split(",");

			fetchQuestions();
			fetchAnswers();

			for (var i = 0; i < data.length; i++)
			{
				if (data[i] == Answers[i]) 
				{
					output+='<div class="correct"><div>Question '+(i+1)+': '+Questions[i]+'</div><div>'+Potential_Answers[i][Answers[i]]+'</div></div><br/>';
					correct+=Weight[i];
				}
				else
				{
					output+='<div class="false"><div>Question '+(i+1)+': '+Questions[i]+'</div><div>'+Potential_Answers[i][Answers[i]]+'</div><div>Your Answer: '+Potential_Answers[i][data[i]]+'</div><div>'+Explain[i]+'</div></div><br/>';
				}
			}

			var percentage='<div class="results">Your Score:'+Math.round((correct / Total)*100)+'%</div><br/>';
			template.innerHTML = percentage+output;
		}
		else
		{
			template.innerHTML = 'Please answer questions first';
		}
	}
	else
	{
		template.innerHTML = 'Please answer questions first';
	}
}