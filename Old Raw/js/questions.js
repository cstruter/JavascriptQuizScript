/*	
	Simple Javascript Quiz Version 1.2
	Copyright (c) 2004-2012 CS Truter
	Written by Christoff Truter
	email: Christoff@cstruter.com - (Please let me know if you intend to use the script) 
	Updated: 2012/04/16
*/
	
function Replace(totalValue,oldValue,newValue)
{
	while(totalValue.indexOf(oldValue) > -1)
		totalValue=totalValue.replace(oldValue,newValue);
			return totalValue;
}

function Paging()
{
	TotalLayers = Math.ceil(Potential_Answers.length / perb);

	if (pagingTemplateObj)
	{
		var pagingOutput = Replace(pagingTemplate,"(::TotalPages::)",TotalLayers);
		pagingOutput = Replace(pagingOutput,"(::TotalQuestions::)",Potential_Answers.length);
		pagingTemplateObj.innerHTML = pagingOutput;
	}
	else
	{
		alert('Error: Paging Template not found!');
	}

}

function checkanswers()
{
	if (checkinput())
	{
		location.href = 'mark.html';
	}
}

function checkinput()
{
	var numControls = (CurrentLayer * perb > Questions.length) ?
		(perb - ((CurrentLayer * perb) - Questions.length)) : perb;

	for (var i=0; i < numControls; i++)
	{
		var complete = false;
		var ControlNum = ((CurrentLayer-1)*perb)+i;
		var Controls = document.getElementsByName('answer'+ControlNum);

		for (var i2=0; i2 <Controls.length; i2++)
		{
			if (Controls[i2].checked)
			{
				complete = true;
				cookieValue[ControlNum] = i2;
			}
		}
		
		if (!complete)
		{
			alert('Please answer all questions');
			return false;
		}
	}
	return true;
}

function Back()
{
	if (checkinput())
	{
		CurrentLayer = (CurrentLayer !=1) ? (CurrentLayer-1) : CurrentLayer;
		Layers();
	}
}
    
function Next()
{
	if (checkinput())
	{
		CurrentLayer = (CurrentLayer < TotalLayers) ? (CurrentLayer+1) : CurrentLayer;
		Layers();
	}
}

function Layers()
{
	for (var Layer=1; Layer<=TotalLayers;Layer++)
	{
		document.getElementById('Layer'+Layer).style.display="none";
	}

	document.getElementById('Layer'+CurrentLayer).style.display="block";
	document.getElementById('back').src = (CurrentLayer == 1) ? "images/back2.gif" : "images/back.gif";
	document.getElementById('next').src = (CurrentLayer == TotalLayers) ? "images/next2.gif" : "images/next.gif";
	document.getElementById('CurrentPage').innerHTML = CurrentLayer;
	document.getElementById('calculate').style.display = (CurrentLayer == TotalLayers) ?
		 'block' : 'none'; 
}

window.onload = function()
{
	SetCookie("questions","");
	pagingTemplateObj = document.getElementById('PagingTemplate');
	pagingTemplate = pagingTemplateObj.innerHTML;
	CurrentLayer = 1;

	fetchQuestions();

	var template = document.getElementById('layer');
	var calculate = document.getElementById('calculate');
	calculate.style.display = 'none';
	var output = '';
		
	for (var p = 0; p < Potential_Answers.length; p++)
	{
		var Layer = Math.ceil(p / perb);
		var question = Replace(template.innerHTML, "(::Question::)", Questions[p]);
		question = (p == 0) ? '<div id="Layer'+(Layer+1)+'">' + question : question;
		question = (p != 0) && ((p % perb) == 0) ? '</div><div id="Layer'+(Layer+1)+'">' + question : question;
		question = (p == Potential_Answers.length-1) ? question+= '</div>' : question;
		var item = '';

		for (i=0;i < Potential_Answers[p].length; i++)
		{
			item+='<span><input type="radio" name="answer'+p+'" /></span><span>' + Potential_Answers[p][i] + '</span><br>';
		}
		
		output+=Replace(question, "(::Answers::)", item)+"<br>";
	}			
	template.innerHTML = output;

	Paging();
	Layers();
}

window.onunload = function ()
{
	SetCookie("questions",cookieValue,expires);
}