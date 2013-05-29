/*	
	Simple Javascript Quiz Version 1.2
	Copyright (c) 2004-2012 CS Truter
	Written by Christoff Truter
	email: Christoff@cstruter.com - (Please let me know if you intend to use the script) 
	Updated: 2012/04/16
*/
	
var expDays = 30;
var expires = new Date(); 
expires.setTime(expires.getTime() + (expDays*24*60*60*1000));

// Create Cookies

function SetCookie (name,value,expires,path,domain,secure) {
document.cookie = name + "=" + escape (value) +
((expires) ? "; expires=" + expires.toGMTString() : "") +
((path) ? "; path=" + path : "") +
((domain) ? "; domain=" + domain : "") +
((secure) ? "; secure" : "");
}

function getCookieVal (offset) {
var endstr = document.cookie.indexOf (";", offset);
if (endstr == -1)
endstr = document.cookie.length;
return unescape(document.cookie.substring(offset, endstr));
}

// Retrieve Cookie Values

function GetCookie (name) {
var arg = name + "=";
var alen = arg.length;
var clen = document.cookie.length;
var i = 0;
while (i < clen) {
var j = i + alen;
if (document.cookie.substring(i, j) == arg)
return getCookieVal (j);
i = document.cookie.indexOf(" ", i) + 1;
if (i == 0) break;
}
return null;
}

// Delete Cookies

function DeleteCookie (name,path,domain) 

{

if (GetCookie(name)) {
document.cookie = name + "=" +
((path) ? "; path=" + path : "") +
((domain) ? "; domain=" + domain : "") +
"; expires=Thu, 01-Jan-70 00:00:01 GMT";}

}

// Test if cookies are available

function havecookies ()
{
var cookieEnabled=(navigator.cookieEnabled)? true : false

if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){ 
document.cookie="testcookie"
cookieEnabled=(document.cookie=="testcookie")? true : false
document.cookie=""
}
return cookieEnabled;
}
