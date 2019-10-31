
var usersObj = [];
var lastUserID = 0;
var loggedUserID = 0;
var checkedID = 0;

$(document).ready(function(){
	
	loadUsersFromLocalStorage();
});

$('#register').on('click', function(){
	signUpAUser();
	location.reload();
	$("#name").val("");
	$("#password").val("");
	$("#email").val("");
});

$('#signIn').on('click', function(){
	//showUsersStorage();
	singUserIn();
});
$('#escapeLink').on('click', function(){
	loggedUserID = 0;
});

function loadUsersFromLocalStorage()
{
	if(localStorage.length>=1){
		
		for(var i=0; i<localStorage.length; i++){
			loadUserstoArray(i);
		}
	
		usersObj.sort(function(a, b){return a.id - b.id;});
		var lastPosition = usersObj.length;
		lastUserID = usersObj[lastPosition-1].id;
	}
}
function loadUserstoArray(i)
{
	var nameOfValue = localStorage.key(i); 	
	if(nameOfValue.charAt(0)=='U'){
		var valueOfName = localStorage.getItem(nameOfValue);
		getDataFromStringWithDashes(valueOfName);
	}
	else return;
}
function getDataFromStringWithDashes(valueOfName)
{
	var dashCounter = 0;
	var string = "";
	var UserInArray = {
	id: 0,
	login: "",
	password: "",
	email: ""
};
	for(var i=0; i<valueOfName.length; i++)
	{
		if(valueOfName.charAt(i) != "/"){
			string = string + valueOfName.substr(i,1);
		}
		if(valueOfName.charAt(i) == '/')
		{
	
			switch(dashCounter)
			{
				case 0: UserInArray.id = parseInt(string); string = ""; break;
				case 1: UserInArray.login = string; string = ""; break;
				case 2: UserInArray.password = string; string = ""; break;
				case 3: UserInArray.email = string; string = ""; break;
			}
			dashCounter++;
		}
		if (dashCounter == 4)
		{
			usersObj.push(UserInArray);
		}
	}
}
function signUpAUser()
{
	var loginValue = document.getElementById("name").value;
	var passwordValue = document.getElementById("password").value;
	var emailValue = document.getElementById("email").value;
	var UserInArray = {
		id: 0,
		login: "",
		password: "",
		email: ""
	};
	if(checkIfLoginIsValid(loginValue)){
		if(passwordValue == '') {alert("Please write the password"); return;}
		if(emailValue == '') {alert("Please write your email"); return;}
		lastUserID++;
		var nameOfUser = "User" + lastUserID.toString();
		var userRecord = lastUserID.toString() +'/'+loginValue+'/'+passwordValue+'/'+emailValue+'/';
		
		
		UserInArray.id = lastUserID;
		UserInArray.login = loginValue;
		UserInArray.password = passwordValue;
		UserInArray.email = emailValue;
		usersObj.push(UserInArray);
		
		localStorage.setItem(nameOfUser, userRecord);
		alert("You are successfully signed up!");
	}
}
function checkIfLoginIsValid(loginValue){
	if(loginValue == "") {
		alert("Please enter your login");
		return false;
	}
	else {
			for(var i=0; i<usersObj.length; i++){
				if(checkifLoginAlreadyExist(i, loginValue)) { alert("This login already exist");
					return false;
				}
		}
		return true;
	}
}
function checkifLoginAlreadyExist(i, loginValue)
{
	if(loginValue == usersObj[i].login) return true;
	else return false;
}
function singUserIn()
{
	var loginValue = document.getElementById("name").value;
	var passwordValue = document.getElementById("password").value;
	var emailValue = document.getElementById("email").value;
	if(loginValue == "") {
		alert("Enter your login"); 
		return;
	}
	else if(checkLogin(loginValue)) {
		if(passwordValue == '') {alert("Please write the password"); return;}
		if(emailValue == '') {alert("Please write your email"); return;}
		if(passwordValue != usersObj[checkedID-1].password) {alert("Wrong password"); return;}
		if(emailValue != usersObj[checkedID-1].email) {alert("Wrong email"); return;}
		loggedUserID = checkedID;
		alert("You have been successfully logged in!");
		//sessionStorage.setItem("UserID", loggedUserID);
		showMenu();
	}
	else alert("This login dosen't exist");
}
function checkLogin(loginValue)
{
	for(var i=0; i<usersObj.length; i++){
		if(checkifLoginAlreadyExist(i, loginValue)) {
			checkedID = usersObj[i].id;
			return true;
		}
	}
	return false;
}
function showUsersStorage(){
	$('.register').css('display','none');
	$('.menu').css('display', 'block');
	var usersData = "";
	
	for(var i=0; i<usersObj.length; i++){
		usersData = usersData + addData(i) + "</br>";
	}

	$('.menu').html(usersData);
}
function addData(i)
{
	var string = "";
	string = string +" "+ usersObj[i].id.toString();
	string = string +" "+ usersObj[i].login;
	string = string +" "+ usersObj[i].email;
	string = string +" "+ usersObj[i].password;
	return string;
}

function showMenu()
{
	$('.register').css('display','none');
	$('.menu').css('display', 'block');
}