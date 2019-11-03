
var usersObj = [];
var expencesObj = [];
var incomesObj = [];
var lastUserID = 0;
var loggedUserID = 0;
var checkedID = 0;
var lastExpenceID = 0;
var lastIncomeID = 0;

$(document).ready(function(){
	
	loadUsersFromLocalStorage();
});
//localStorage.removeItem("Income1");
//localStorage.removeItem("Income7");

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

$('#expences').on('click',function(){
	
	showExpenceManager();
});

$('#incomes').on('click',function(){
	
	showIncomesManager();
});

$('#addExpenceButton').on('click',function(){
	addNewExpence();
});

$('#addIncomeButton').on('click',function(){
	addNewIncome();
});

$('#escape').on('click', function(){
	loggedUserID = 0;
	var endOfArrayExpences = expencesObj.length;
	expencesObj.splice(0,endOfArrayExpences);
	location.reload();
	$("#name").val("");
	$("#password").val("");
	$("#email").val("");
});

$('#showStorage').on('click', function(){
	showExpenceStorage();
});

$('#showIncomeStorage').on('click', function(){
	showIncomeStorage();
});

$('#escapeIncomes').on('click', function(){
	loggedUserID = 0;
	var endOfArrayIncomes = incomesObj.length;
	incomesObj.splice(0,endOfArrayIncomes);
	location.reload();
	$("#name").val("");
	$("#password").val("");
	$("#email").val("");
});
function loadUsersFromLocalStorage()
{
	if(localStorage.length>=1){
		
		for(var i=0; i<localStorage.length; i++){
			loadUserstoArray(i);
		}
	
		usersObj.sort(function(a, b){return a.id - b.id;});
		var lastPosition = usersObj.length;
		if(lastPosition>0)
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
		if(passwordValue == '') {alert("Proszę wpisać hasło"); return;}
		if(emailValue == '') {alert("Proszę wpisać poprawny adres email"); return;}
		lastUserID++;
		var nameOfUser = "User" + lastUserID.toString();
		var userRecord = lastUserID.toString() +'/'+loginValue+'/'+passwordValue+'/'+emailValue+'/';
		
		
		UserInArray.id = lastUserID;
		UserInArray.login = loginValue;
		UserInArray.password = passwordValue;
		UserInArray.email = emailValue;
		usersObj.push(UserInArray);
		
		localStorage.setItem(nameOfUser, userRecord);
		alert("Zostałeś zarejestrowany!");
	}
}
function checkIfLoginIsValid(loginValue){
	if(loginValue == "") {
		alert("Wpisz swój login");
		return false;
	}
	else {
			for(var i=0; i<usersObj.length; i++){
				if(checkifLoginAlreadyExist(i, loginValue)) { alert("Ten login już istnieje. Proszę wybrać inny login.");
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
		alert("Wpisz swój login"); 
		return;
	}
	else if(checkLogin(loginValue)) {
		if(passwordValue == '') {alert("Proszę wpisać hasło"); return;}
		if(emailValue == '') {alert("Proszę wpisać prawidłowy adres email"); return;}
		if(passwordValue != usersObj[checkedID-1].password) {alert("Podano błędne hasło"); return;}
		if(emailValue != usersObj[checkedID-1].email) {alert("Podano błędny adres email"); return;}
		loggedUserID = checkedID;
		alert("Zostałeś zalogowany!");
		//sessionStorage.setItem("UserID", loggedUserID);
		loadExpencesOfLoggedUser();
		loadIncomesOfLoggedUser();
		showMenu();
	}
	else alert("Podany login nie istnieje!");
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

function showExpenceManager()
{
	$('.expenceContainer').css('display','block');
	$('.register').css('display','none');
	$('.menu').css('display', 'none');
	$('.incomesContainer').css('display','none');
}
function loadExpencesOfLoggedUser()
{
	for(var i=0; i<localStorage.length; i++){
		loadExpencestoArray(i);
	}

	expencesObj.sort(function(a, b){return a.id - b.id;});
	
}
function loadExpencestoArray(i)
{
	var nameOfValue = localStorage.key(i); 
	if(nameOfValue.charAt(0)=='E'){	
		var valueOfName = localStorage.getItem(nameOfValue);
		getExpenceDataFromStringWithDashes(valueOfName);
	}
}
function getExpenceDataFromStringWithDashes(valueOfName)
{
	var dashCounter = 0;
	var string = "";
	var ExpenceInArray = {
	id: 0,
	userId: 0,
	amount: "",
	date: "",
	payment: "",
	source: "",
	comment: ""
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
				case 0: ExpenceInArray.id = parseInt(string); 
					if(lastExpenceID<ExpenceInArray.id)
						lastExpenceID = ExpenceInArray.id; 
					
					string = ""; break;
				case 1: ExpenceInArray.userId = parseInt(string); string = ""; 
					if(ExpenceInArray.userId != loggedUserID) return;
				break;
				case 2: 
					string = changeCommasToDots(string);
					ExpenceInArray.amount = parseFloat(string); string = ""; break;
				case 3: ExpenceInArray.date = string; string = ""; break;
				case 4: ExpenceInArray.payment = string; string = ""; break;
				case 5: ExpenceInArray.source = string; string = ""; break;
				case 6: ExpenceInArray.comment = string; string = ""; break;
			}
			dashCounter++;
		}
		if (dashCounter == 7)
		{
			expencesObj.push(ExpenceInArray);
		}
	}
}
function addNewExpence()
{
	
	lastExpenceID++;
	var ExpenceInArray = {
		id: 0,
		userId: 0,
		amount: "",
		date: "",
		payment: "",
		source: "",
		comment: ""
	};
	var amount;
	amount = $('#amount').val();
	if(amount == '') {alert("Proszę podaj rozmiar wydatku"); return;}
	var date;
	date = $('#dateExpence').val();
	if(date == '') {alert("Proszę podaj datę"); return;}
	var wayOfPayment;
	wayOfPayment = $("input[type=radio][name=payment]:checked").val();
	var category;
	category = $("input[type=radio][name=cat]:checked").val();
	var comment;
	comment = $('#commentExpence').val();
	var string = lastExpenceID.toString()+"/"+ loggedUserID.toString()+"/"+ amount +"/"+date+"/"+wayOfPayment+"/"+category+"/"+comment+"/";
	
	
	ExpenceInArray.id = lastExpenceID;
	ExpenceInArray.userId = loggedUserID;
	ExpenceInArray.amount = amount;
	ExpenceInArray.date = date;
	ExpenceInArray.payment = wayOfPayment;
	ExpenceInArray.source = category;
	ExpenceInArray.comment = comment;
	expencesObj.push(ExpenceInArray);
	
	var nameOfExpence = "Expence" + lastExpenceID.toString();
	var valueOfExpence = string;
	localStorage.setItem(nameOfExpence, valueOfExpence);
	
	alert("Dodałeś nowy wydatek!");
	
	$('#amount').val("");
	$('#dateExpence').val("");
	$('#commentExpence').val("");
	
}
function showExpenceStorage(){
	var expenceData = "";
	
	for(var i=0; i<expencesObj.length; i++){
		expenceData = expenceData + addExpenceData(i) + "</br>";
	}
	
	if(expenceData == "") $('.expenceContainer').html("niestety expencesObj jest puste");
	
	$('.expenceContainer').html(expenceData);
}
function addExpenceData(i)
{
	var string = "";
	string = string +" "+ expencesObj[i].id.toString();
	string = string +" "+ expencesObj[i].userId.toString();
	string = string +" "+ expencesObj[i].amount;
	string = string +" "+ expencesObj[i].date;
	string = string +" "+ expencesObj[i].payment;
	string = string +" "+ expencesObj[i].source;
	string = string +" "+ expencesObj[i].comment;
	return string;
}
function showIncomesManager()
{
	$('.expenceContainer').css('display','none');
	$('.register').css('display','none');
	$('.menu').css('display', 'none');
	$('.incomesContainer').css('display','block');
}

function addNewIncome()
{
	
	lastIncomeID++;
	var IncomeInArray = {
		id: 0,
		userId: 0,
		amount: "",
		date: "",
		category: "",
		comment: ""
	};
	var amount;
	amount = $('#incomeAmount').val();
	if(amount == '') {alert("Proszę podaj rozmiar przychodu"); return;}
	var date;
	date = $('#dateIncome').val();
	if(amount == '') {alert("Proszę podaj datę przychodu"); return;}
	var category;
	category = $("input[type=radio][name=incomeCategory]:checked").val();
	var comment;
	comment = $('#commentIncome').val();
	var string = lastIncomeID.toString()+"/"+ loggedUserID.toString()+"/"+ amount +"/"+date+"/"+category+"/"+comment+"/";
	
	
	IncomeInArray.id = lastIncomeID;
	IncomeInArray.userId = loggedUserID;
	IncomeInArray.amount = amount;
	IncomeInArray.date = date;
	IncomeInArray.category = category;
	IncomeInArray.comment = comment;
	incomesObj.push(IncomeInArray);
	
	var nameOfIncome = "Income" + lastIncomeID.toString();
	var valueOfIncome = string;
	localStorage.setItem(nameOfIncome, valueOfIncome);
	
	alert("Dodałeś nowy przychód!");
	
	$('#incomeAmount').val("");
	$('#dateIncome').val("");
	$('#commentIncome').val("");
	
}
function loadIncomesOfLoggedUser()
{
	for(var i=0; i<localStorage.length; i++){
		loadIncomestoArray(i);
	}

	incomesObj.sort(function(a, b){return a.id - b.id;});
	
}
function loadIncomestoArray(i)
{
	var nameOfValue = localStorage.key(i); 
	if(nameOfValue.charAt(0)=='I'){	
		var valueOfName = localStorage.getItem(nameOfValue);
		getIncomeDataFromStringWithDashes(valueOfName);
	}
}
function getIncomeDataFromStringWithDashes(valueOfName)
{
	var dashCounter = 0;
	var string = "";
	var IncomeInArray = {
		id: 0,
		userId: 0,
		amount: "",
		date: "",
		category: "",
		comment: ""
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
				case 0: IncomeInArray.id = parseInt(string); 
					if(lastIncomeID<IncomeInArray.id)
						lastIncomeID = IncomeInArray.id; 
					
					string = ""; break;
				case 1: IncomeInArray.userId = parseInt(string); string = ""; 
					if(IncomeInArray.userId != loggedUserID) return;
				break;
				case 2: 
					string = changeCommasToDots(string);
					IncomeInArray.amount = parseFloat(string); string = ""; break;
				case 3: IncomeInArray.date = string; string = ""; break;
				case 4: IncomeInArray.category = string; string = ""; break;
				case 5: IncomeInArray.comment = string; string = ""; break;
			}
			dashCounter++;
		}
		if (dashCounter == 6)
		{
			incomesObj.push(IncomeInArray);
		}
	}
}
function changeCommasToDots(string)
{
	var newString = "";
	for(var i=0; i<string.length; i++)
	{
		if(string.charAt(i)==',')
		{
			newString += '.';
			i++;
		}
		newString = newString + string.substr(i,1);
	}
	return newString;
}

function showIncomeStorage(){
	var incomeData = "";
	
	for(var i=0; i<incomesObj.length; i++){
		incomeData = incomeData + addIncomeData(i) + "</br>";
	}
	
	if(incomeData == "") $('.incomesContainer').html("niestety incomesObj jest puste");
	
	$('.incomesContainer').html(incomeData);
}
function addIncomeData(i)
{
	var string = "";
	string = string +" "+ incomesObj[i].id.toString();
	string = string +" "+ incomesObj[i].userId.toString();
	string = string +" "+ incomesObj[i].amount;
	string = string +" "+ incomesObj[i].date;
	string = string +" "+ incomesObj[i].category;
	string = string +" "+ incomesObj[i].comment;
	return string;
}