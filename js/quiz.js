/*	
	Simple Javascript Quiz Version 1.2
	Copyright (c) 2004-2012 CS Truter
	Written by Christoff Truter
	email: Christoff@cstruter.com - (Please let me know if you intend to use the script) 
	Updated: 2012/04/16
*/
	
// Include cookies js file

document.write('<script language="javascript" src="js/cookies.js"></script>');

// Arrays used in generating the quiz

var Questions = new Array();
var Potential_Answers = new Array();
var cookieValue = new Array();
var Explain = new Array();
var Weight = new Array();
var xmlObj;
var Total = 0;

// How many entries will be displayed per page

var perb = 3;

if (document.all)
{
	loadXML = function(file)
	{
		var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false";
		xmlDoc.load(file);
		xmlObj=xmlDoc.documentElement;
	}

	fetchQuestions = function()
	{
		loadXML('xml/questions.xml');
		for (var i = 0; i < xmlObj.childNodes.length; i++)
		{
			Questions[i]=xmlObj.childNodes[i].childNodes(0).firstChild.text;
			Potential_Answers[i] = new Array();

			for (q=0;q<(xmlObj.childNodes[i].childNodes.length-1);q++)
			{
				Potential_Answers[i][q]=xmlObj.childNodes[i].childNodes(q+1).firstChild.text;
			}
		}
	}

	fetchAnswers = function()
	{
		loadXML('xml/answers.xml');
		for (i=0;i<xmlObj.childNodes.length;i++)
		{
			Answers[i]=xmlObj.childNodes[i].childNodes(0).firstChild.text;
			Explain[i]=xmlObj.childNodes[i].childNodes(1).firstChild.text;
			Weight[i]=parseInt(xmlObj.childNodes[i].childNodes(2).firstChild.text);
			Total+=Weight[i];
		}
	}
}
else
{
	loadXML = function(file)
	{
		var xmlDoc = new window.XMLHttpRequest();
		xmlDoc.open("GET",file,false);
		xmlDoc.send(null);
		xmlObj = xmlDoc.responseXML.documentElement.getElementsByTagName("ANSWERS");
	}
	
	fetchQuestions = function()
	{
		loadXML('xml/questions.xml');

		for(var i=0; i<xmlObj.length; i++) 
		{	
			Questions[i] = xmlObj[i].getElementsByTagName("QUESTION")[0].childNodes[0].nodeValue;
			Potential_Answers[i] = new Array();
			
			for (q=0;q<((xmlObj[i].childNodes.length-1)/2)-1;q++)
			{
				Potential_Answers[i][q] = xmlObj[i].getElementsByTagName("ANSWER")[q].childNodes[0].nodeValue;				
			}
		}
	}

	fetchAnswers = function()
	{
		loadXML('xml/answers.xml');
		for (i=0;i<xmlObj.length;i++)
		{
			Answers[i]=xmlObj[i].getElementsByTagName("ANSWER")[0].childNodes[0].nodeValue;
			Explain[i]=xmlObj[i].getElementsByTagName("EXPLANATION")[0].childNodes[0].nodeValue;
			Weight[i]=parseInt(xmlObj[i].getElementsByTagName("WEIGHT")[0].childNodes[0].nodeValue);
			Total+=Weight[i];
		}
	}
}