
var usersObj = [];
var expencesObj = [];
var incomesObj = [];
var lastUserID = 0;
var loggedUserID = 0;
var checkedID = 0;
var lastExpenceID = 0;
var lastIncomeID = 0;
var addedExpenceMethod = 0;
var addedExpenceCathegory = 0;
var addedIncomeCathegory = 0;

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

$('#setup').on('click',function(){
	
	showSetupManager();
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

$('#listLoginChange').on('click', function(){
	$('#loginSetup').css('display', 'block');
	
	$('.setupContainer').css({'height': '600px'});
	$('#expenceMenuSetup').css({'height': '500px'});
	
	$('#expenceMenuSetup').css('display', 'none');
	$('#incomeMenuSetup').css('display', 'none');
});

$('#changeLoginButton').on('click', function(){
	changeLoginOfLoggedUser();
});
$('#changePasswordButton').on('click', function(){
	changePasswordOfLoggedUser();
});
$('#changeEmailButton').on('click', function(){
	changeEmailOfLoggedUser();
});
$('#listExpenceChange').on('click', function(){
	$('#loginSetup').css('display', 'none');
	$('#expenceMenuSetup').css('display', 'block');
	$('#incomeMenuSetup').css('display', 'none');
	loadPaymentWaysToDiv();
	loadCathegoriesToDiv();
	adjustSetupHeight();
});
$('#addPaymentWayButton').on('click', function(){
	addNewMethodOfPayment();
});

$('#deleteMethodButton').on('click', function(){
	deleteMethodOfPayment();
});
$('#addExpenceCathegoryButton').on('click', function(){
	addNewCathegoryOfPayment();
});
$('#deleteExpenceCathegoryButton').on('click', function(){
	deleteCathegoryOfPayment();
});
$('#listIncomeChange').on('click', function(){
	$('#loginSetup').css('display', 'none');	
	$('#expenceMenuSetup').css('display', 'none');
	$('#incomeMenuSetup').css('display', 'block');
	$('.setupContainer').css({'height': '600px'});
	$('#expenceMenuSetup').css({'height': '500px'});
	loadIncomeCathegoriesToDiv();
});
$('#addIncomeCathegoryButton').on('click', function(){
	addNewCathegoryOfIncome();
});
$('#escapeSetup').on('click', function(){
	showMenu();
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

function showMenu(){
	$('.register').css('display','none');
	$('.menu').css('display', 'block');
	$('.setupContainer').css('display', 'none');
}

function showExpenceManager(){
	$('.expenceContainer').css('display','block');
	$('.register').css('display','none');
	$('.menu').css('display', 'none');
	$('.setupContainer').css('display', 'none');
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
function showIncomesManager(){
	$('.expenceContainer').css('display','none');
	$('.register').css('display','none');
	$('.menu').css('display', 'none');
	$('.setupContainer').css('display', 'none');
	$('.incomesContainer').css('display','block');
}

function addNewIncome(){
	
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
function loadIncomesOfLoggedUser(){
	for(var i=0; i<localStorage.length; i++){
		loadIncomestoArray(i);
	}

	incomesObj.sort(function(a, b){return a.id - b.id;});
	
}
function loadIncomestoArray(i){
	var nameOfValue = localStorage.key(i); 
	if(nameOfValue.charAt(0)=='I'){	
		var valueOfName = localStorage.getItem(nameOfValue);
		getIncomeDataFromStringWithDashes(valueOfName);
	}
}
function getIncomeDataFromStringWithDashes(valueOfName){
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
function changeCommasToDots(string){
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
function addIncomeData(i){
	var string = "";
	string = string +" "+ incomesObj[i].id.toString();
	string = string +" "+ incomesObj[i].userId.toString();
	string = string +" "+ incomesObj[i].amount;
	string = string +" "+ incomesObj[i].date;
	string = string +" "+ incomesObj[i].category;
	string = string +" "+ incomesObj[i].comment;
	return string;
}
function showSetupManager(){
	$('.expenceContainer').css('display','none');
	$('.register').css('display','none');
	$('.menu').css('display', 'none');
	$('.setupContainer').css('display', 'block');
	$('.incomesContainer').css('display','none');
}

function changeLoginOfLoggedUser(){
	if($('#loginChange').val()=="") {alert("Nie podałeś loginu do zmiany"); return;}
	for(var i=0; i<localStorage.length; i++){
		var nameOfValue = localStorage.key(i); 	
		if(nameOfValue.charAt(0)=='U'){
			var lastChar = nameOfValue.length - 1;
			if(nameOfValue.charAt(lastChar)==loggedUserID){
				var valueOfName = localStorage.getItem(nameOfValue);
				changeLoginInLocalStorage(valueOfName, nameOfValue);
				return;
			}
		}
	}
}

function changeLoginInLocalStorage(valueOfName,nameOfValue){
	var dashCounter = 0;
	var string = "";
	var stringAfterChange = "";
	for(var i=0; i<valueOfName.length; i++){
		if(valueOfName.charAt(i) != '/'){
			string = string + valueOfName.substr(i,1);
		}
		if(valueOfName.charAt(i) == '/')
		{
	
				if(dashCounter == 1){
				string = ""; 
				stringAfterChange = stringAfterChange + $('#loginChange').val() +'/';
				}
				else{ 
				stringAfterChange = stringAfterChange + string +'/';
				string = ""; 
				}
			
			dashCounter++;
		}
		if(dashCounter==4){
			localStorage.setItem(nameOfValue,stringAfterChange);
			alert("login został zmieniony!");
			$('#loginChange').val("");
		}
	}
}
function changePasswordOfLoggedUser(){
	if($('#passwordChange').val()=="") {alert("Nie podałeś hasła do zmiany"); return;}
	for(var i=0; i<localStorage.length; i++){
		var nameOfValue = localStorage.key(i); 	
		if(nameOfValue.charAt(0)=='U'){
			var lastChar = nameOfValue.length - 1;
			if(nameOfValue.charAt(lastChar)==loggedUserID){
				var valueOfName = localStorage.getItem(nameOfValue);
				changePasswordInLocalStorage(valueOfName, nameOfValue);
				return;
			}
		}
	}
}
function changePasswordInLocalStorage(valueOfName,nameOfValue){
	var dashCounter = 0;
	var string = "";
	var stringAfterChange = "";
	for(var i=0; i<valueOfName.length; i++){
		if(valueOfName.charAt(i) != '/'){
			string = string + valueOfName.substr(i,1);
		}
		if(valueOfName.charAt(i) == '/')
		{
	
				if(dashCounter == 2){
				string = ""; 
				stringAfterChange = stringAfterChange + $('#passwordChange').val() +'/';
				}
				else{ 
				stringAfterChange = stringAfterChange + string +'/';
				string = ""; 
				}
			
			dashCounter++;
		}
		if(dashCounter==4){
			localStorage.setItem(nameOfValue,stringAfterChange);
			alert("hasło zostało zmienione!");
			$('#passwordChange').val("");
		}
	}
}
function changeEmailOfLoggedUser(){
	if($('#emailChange').val()=="") {alert("Nie podałeś adresu email do zmiany"); return;}
	for(var i=0; i<localStorage.length; i++){
		var nameOfValue = localStorage.key(i); 	
		if(nameOfValue.charAt(0)=='U'){
			var lastChar = nameOfValue.length - 1;
			if(nameOfValue.charAt(lastChar)==loggedUserID){
				var valueOfName = localStorage.getItem(nameOfValue);
				changeEmailInLocalStorage(valueOfName, nameOfValue);
				return;
			}
		}
	}
}
function changeEmailInLocalStorage(valueOfName,nameOfValue){
	var dashCounter = 0;
	var string = "";
	var stringAfterChange = "";
	for(var i=0; i<valueOfName.length; i++){
		if(valueOfName.charAt(i) != '/'){
			string = string + valueOfName.substr(i,1);
		}
		if(valueOfName.charAt(i) == '/')
		{
	
				if(dashCounter == 3){
				string = ""; 
				stringAfterChange = stringAfterChange + $('#emailChange').val() +'/';
				}
				else{ 
				stringAfterChange = stringAfterChange + string +'/';
				string = ""; 
				}
			
			dashCounter++;
		}
		if(dashCounter==4){
			localStorage.setItem(nameOfValue,stringAfterChange);
			alert("adres email został zmieniony!");
			$('#emailChange').val("");
		}
	}
}
function addNewMethodOfPayment(){
	var addedMethod = $('#addPayment').val();
	if(addedMethod == "") {alert("Nie wprowadzono nowej metody!"); return;};
	if(addedExpenceMethod==0){
	 $('#paymentWay').append("<div class=\"kol\" id=\""+addedMethod+"\"><label><input type='radio' value=\""+ addedMethod +"\" name='payment' checked>"+ addedMethod +"</label></div>");
	 $('#paymentWayList').append("<div style=\"clear:both;\"></div>");
	 addedExpenceMethod++;
	 var height = $('.expenceContainer').css('height');
	 height = parseInt(height) + 15;
	 var heightSting = height.toString();
	 $('.expenceContainer').css({height: heightSting +'px'});
	}
	else{
		 $('#paymentWay .kol').last().append("<div id=\""+addedMethod+"\"><label><input type='radio' value=\""+ addedMethod +"\" name='payment' checked>"+ addedMethod +"</label></div>");
		 addedExpenceMethod++;
		 if(addedExpenceMethod==3) addedExpenceMethod = 0;
	}
	
	alert("Dodano nową metodę płatności");
	$('#addPayment').val("");
}
function deleteSpaces(wayOfPayment){
	var string = "";
	for(var i=0; i<wayOfPayment.length; i++){
		if(wayOfPayment.charAt(i)==" ") continue;
		string = string + wayOfPayment.substr(i,1);
	}
	return string;
}
function loadPaymentWaysToDiv(){
	
		var methods = $('#paymentWay').html();
		$('#expenceMethodDelete').html("");
		var string = "";
		var quotMarks = false;
		var methodsString = "<fieldset id=\"deletePaymentWay\">";
		for(var i=0; i<methods.length; i++){
			
			if(methods.charAt(i)==" " && quotMarks == false) 
			{
				var beginnigString = methods.substr(i+1 ,5);
				if(beginnigString == "value"){
					quotMarks = true;
					i=i+8;
				
				}
			}
			if(quotMarks == true){
				
				if(methods.charAt(i) == "\"") {
					methodsString += "<div><input type=\"radio\" name=\"expenceDelete\" value=\""+string+"\">"+string+"</div>";
					quotMarks = false;
					string = "";
					continue;
				}
				string = string + methods.substr(i,1);
			}
		}
		methodsString += "</fieldset>";
		$('#expenceMethodDelete').append(methodsString);
		var positionButton = $('#expenceMethodDelete').css('height');
		positionButton = (parseInt(positionButton) / 2) - 15;
		var positionSting = positionButton.toString();
		$('#deleteMethodButton').css({'margin-top': positionSting +'px'});
	
}
function deleteMethodOfPayment(){
	var wayOfPayment = $("input[type=radio][name=expenceDelete]:checked").val();
	wayOfPayment = deleteSpaces(wayOfPayment);
	var element = document.getElementById(wayOfPayment);
    element.parentNode.removeChild(element);
	alert("Usunięto wybraną metodę płatności");
}
function loadCathegoriesToDiv(){
	var methods = $('#expenceCategory').html();
		$('#expenceCathegoryDelete').html("");
		var string = "";
		var quotMarks = false;
		var addedCathegory = 0;
		var methodsString = "<fieldset id=\"deleteCathegoryWay\"></fieldset>";
		$('#expenceCathegoryDelete').append(methodsString);
		methodsString="";
		for(var i=0; i<methods.length; i++){
			
			if(methods.charAt(i)==" " && quotMarks == false) 
			{
				var beginnigString = methods.substr(i+1 ,5);
				if(beginnigString == "value"){
					quotMarks = true;
					i=i+8;
				
				}
			}
			if(quotMarks == true){
				
				if(methods.charAt(i) == "\"") {
					if(addedCathegory % 8 == 0){
						methodsString += "<div class=\"kol\"><input type=\"radio\" name=\"expenceMethodDelete\" value=\""+string+"\">"+string+"</div>";
						quotMarks = false;
						addedCathegory++;
						string = "";
						
						$('#deleteCathegoryWay').append(methodsString);
						methodsString = "";
						continue;
					}
					else{
						methodsString += "<div><input type=\"radio\" name=\"expenceMethodDelete\" value=\""+string+"\">"+string+"</div>";
						quotMarks = false;
						addedCathegory++;
						string = "";
						
						$('#deleteCathegoryWay .kol').last().append(methodsString);
						methodsString = "";
						continue;
					}
				}
				string = string + methods.substr(i,1);
			}
		}
		methodsString += "</fieldset>";
		//$('#expenceMethodDelete').append(methodsString);
		//var addHeight = $('#expenceCathegoryDelete').css('height');
		//addHeight = parseInt(addHeight) + 600;
		//var positionSting = addHeight.toString();
		//$('.setupContainer').css({'height': positionSting +'px'});
		
		//var positionButton = $('#expenceMethodDelete').css('height');
		//positionButton = (parseInt(positionButton) / 2) - 15;
		//var positionSting = positionButton.toString();
		//$('#deleteMethodButton').css({'margin-top': positionSting +'px'});
}
function deleteCathegoryOfPayment(){
	var cathegoryOfPayment = $("input[type=radio][name=expenceMethodDelete]:checked").val();
	$('input[type=radio][name=expenceMethodDelete]:checked').remove();
	cathegoryOfPayment = deleteSpaces(cathegoryOfPayment);
	var element = document.getElementById(cathegoryOfPayment);
    element.parentNode.removeChild(element);
	
	alert("Usunięto wybraną kategorię płatności");
}
function addNewCathegoryOfPayment(){
	var addedCathegory = $('#addExpenceCathegory').val();
	if(addedCathegory == "") {alert("Nie wprowadzono nowej kategorii!"); return;};
	if(addedExpenceCathegory%3 == 0){
	 $('#expenceCategory').append("<div class=\"kol\" id=\""+addedCathegory+"\"><input type='radio' value=\""+ addedCathegory +"\" name='cat' checked><label>"+ addedCathegory +"</label></div>");
	 $('#paymentCathegoriesListDiv').append("<div style=\"clear:both;\"></div>");
	 if(addedExpenceCathegory%9 == 0){
		addHeightToExpenceSiteDiv();
	 }
	 addedExpenceCathegory++;
	}
	else{
		 $('#expenceCategory .kol').last().append("<div id=\""+addedCathegory+"\"><input type='radio' value=\""+ addedCathegory +"\" name='cat' checked><label>"+ addedCathegory +"</label></div>");
		 addedExpenceCathegory++;
	}
	 alert("Dodano nową kategorię wydatku");
	 $('#addExpenceCathegory').val("");
}
function adjustSetupHeight(){
	var methodsHeight = $('#expenceMethodDelete').css('height');
	var cathegoriesHeight = $('#expenceCathegoryDelete').css('height');
	var heightOfTextInputs = 62;
	var heightOfHeaders = 192;
	var totalHeight = parseInt(methodsHeight) + parseInt(cathegoriesHeight) + heightOfHeaders + heightOfTextInputs;
	if(totalHeight>=500){
		totalHeight += 170;
		$('.setupContainer').css({'height': totalHeight.toString() +'px'});
		totalHeight -= 110;
		$('#expenceMenuSetup').css({'height': totalHeight.toString() +'px'});
	}
	
}
function addHeightToExpenceSiteDiv(){
	var height = $('.expenceContainer').css('height');
	 height = parseInt(height) + 60;
	 var heightSting = height.toString();
	 $('.expenceContainer').css({height: heightSting +'px'});
}
function loadIncomeCathegoriesToDiv(){
	var methods = $('#incomeCategory').html();
		$('#incomeCathegoryDelete').html("");
		var string = "";
		var quotMarks = false;
		var methodsString = "<fieldset id=\"deleteIncomeCathegoryFieldset\">";
		for(var i=0; i<methods.length; i++){
			
			if(methods.charAt(i)==" " && quotMarks == false) 
			{
				var beginnigString = methods.substr(i+1 ,5);
				if(beginnigString == "value"){
					quotMarks = true;
					i=i+8;
				
				}
			}
			if(quotMarks == true){
				
				if(methods.charAt(i) == "\"") {
					methodsString += "<div><input type=\"radio\" name=\"incomeDeleteCathegoryInput\" value=\""+string+"\">"+string+"</div>";
					quotMarks = false;
					string = "";
					continue;
				}
				string = string + methods.substr(i,1);
			}
		}
		methodsString += "</fieldset>";
		$('#incomeCathegoryDelete').append(methodsString);
		var positionButton = $('#incomeCathegoryDelete').css('height');
		positionButton = (parseInt(positionButton) / 2) - 15;
		var positionSting = positionButton.toString();
		$('#deleteIncomeCathegoryButton').css({'margin-top': positionSting +'px'});
}
function addNewCathegoryOfIncome(){
	var addedCathegory = $('#addIncomeCathegoryTextInput').val();
	if(addedIncomeCathegory==0){
	 $('#incomeCategory').append("<div class=\"kol\" id=\""+addedCathegory+"\"><input type='radio' value=\""+ addedCathegory +"\" name='incomeCategory' checked><label>"+ addedCathegory +"</label></div>");
	 $('#paymentCathegoriesListDiv').append("<div style=\"clear:both;\"></div>");
	 addedIncomeCathegory++;
	 
	}
	else{
		 $('#incomeCategory .kol').last().append("<div id=\""+addedCathegory+"\"><input type='radio' value=\""+ addedCathegory +"\" name='incomeCategory' checked><label>"+ addedCathegory +"</label></div>");
		 addedIncomeCathegory++;
		 if(addedIncomeCathegory==4) addedIncomeCathegory = 0;
	}
	 alert("Dodano nową kategorię przychodu");
	 $('#addIncomeCathegoryTextInput').val("");
}