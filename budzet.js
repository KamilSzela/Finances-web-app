
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
var sumOfIncomes = 0;
var sumOfExpences = 0;

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
	singUserIn();
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

$('#logOutDiv').on('click', function(){
	loggedUserID = 0;
	var endOfArrayExpences = expencesObj.length;
	expencesObj.splice(0,endOfArrayExpences);
	var endOfArrayIncomes = incomesObj.length;
	incomesObj.splice(0,endOfArrayIncomes);
	location.reload();
	$("#name").val("");
	$("#password").val("");
	$("#email").val("");
});

$('#backFromExpencesButton').on('click', function(){
	showMenu();
});

$('#backFromIncomesButton').on('click', function(){
	showMenu();
});

$('#listLoginChange').on('click', function(){
	$('#loginSetup').css('display', 'block');
	
	$('.setupContainer').css({'height': '600px'});
	$('.setupFunction').css({'height': '542px'});
	$('#expenceMenuSetup').css({'height': '500px'});
	
	$('#expenceMenuSetup').css('display', 'none');
	$('#incomeMenuSetup').css('display', 'none');
	$('#lastInputsMenuSetup').css('display', 'none');
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
	$('#lastInputsMenuSetup').css('display', 'none');
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
	$('.setupFunction').css({'height': '542px'});
	$('#expenceMenuSetup').css({'height': '500px'});
	$('#lastInputsMenuSetup').css('display', 'none');
	loadIncomeCathegoriesToDiv();
});
$('#addIncomeCathegoryButton').on('click', function(){
	addNewCathegoryOfIncome();
});
$('#deleteIncomeCathegoryButton').on('click', function(){
	deleteCathegoryOfIncome();
});
$('#listLastInputsDelete').on('click', function(){
	$('#loginSetup').css('display', 'none');	
	$('#expenceMenuSetup').css('display', 'none');
	$('#incomeMenuSetup').css('display', 'none');
	$('.setupContainer').css({'height': '600px'});
	$('#lastInputsMenuSetup').css({'height': '485px'});
	$('#lastInputsMenuSetup').css('display', 'block');
	loadIncomesFromArrayToDiv();
	loadExpencesFromArrayToDiv();
	adjustButtonPositionToDeletingLastInputs();
});

$('#deleteIncomeInLocalStorageButton').on('click', function(){
	deleteIncomeInLocalStorage();
});
$('#deleteExpenceInLocalStorageButton').on('click', function(){
	deleteExpenceInLocalStorage();
});
$('#summary').on('click',function(){
	showSummaryManager();
});
$('#dateSpan').on('change', function(){
	prepareSummaryBoard();
});

$('#generateSummaryButton').on('click', function(){
	var choice = $('#dateSpan').val();
	createTableOfExpences(choice);
	createTableOfIncomes(choice);
	adjustSummaryButtonPosition();
	evaluateFinanceManagement();
});
$('#escapeSetup').on('click', function(){
	showMenu();
});

$('#escapeSummary').on('click', function(){
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


function showMenu(){
	$('.register').css('display','none');
	$('#logOutDiv').css('display','block');
	$('.menu').css('display', 'block');
	$('.setupContainer').css('display', 'none');
	$('.incomesContainer').css('display','none');
	$('.expenceContainer').css('display','none');
	$('.summaryContainer').css('display','none');
	
}
function showExpenceManager(){
	$('.expenceContainer').css('display','block');
	$('.register').css('display','none');
	$('.menu').css('display', 'none');
	$('.setupContainer').css('display', 'none');
	$('.incomesContainer').css('display','none');
	$('.summaryContainer').css('display','none');
}
function showIncomesManager(){
	$('.expenceContainer').css('display','none');
	$('.register').css('display','none');
	$('.menu').css('display', 'none');
	$('.setupContainer').css('display', 'none');
	$('.incomesContainer').css('display','block');
	$('.summaryContainer').css('display','none');
}
function showSetupManager(){
	$('.expenceContainer').css('display','none');
	$('.register').css('display','none');
	$('.menu').css('display', 'none');
	$('.setupContainer').css('display', 'block');
	$('.incomesContainer').css('display','none');
	$('.summaryContainer').css('display','none');
}
function showSummaryManager()
{
	$('.expenceContainer').css('display','none');
	$('.register').css('display','none');
	$('.menu').css('display', 'none');
	$('.summaryContainer').css('display','block');
	$('.incomesContainer').css('display','none');
	$('.setupContainer').css('display', 'none');
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
					var expenceValue = parseFloat(string);
					ExpenceInArray.amount = Math.round(expenceValue*100)/100; string = ""; break;
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
function addExpenceData(i)
{
	var string = "";
	string = string +"<b>id wydatku: </b>"+ expencesObj[i].id.toString();
	string = string +",<b> rozmiar wydatku: </b>"+ expencesObj[i].amount;
	string = string +",<b>  data wydatku: </b>"+ expencesObj[i].date;
	string = string +",<b>  metoda zapłaty: wydatku: </b>"+ expencesObj[i].payment;
	string = string +",<b>  źródło wydatku: </b>"+ expencesObj[i].source;
	string = string +",<b> komentarz: </b>"+ expencesObj[i].comment;
	return string;
}
function addNewIncome(){
	
	lastIncomeID++;
	var IncomeInArray = {
		id: 0,
		userId: 0,
		amount: "",
		date: "",
		cathegory: "",
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
	IncomeInArray.cathegory = category;
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
		cathegory: "",
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
					var incomeValue = parseFloat(string);
					IncomeInArray.amount = Math.round(incomeValue*100)/100; string = ""; break;
				case 3: IncomeInArray.date = string; string = ""; break;
				case 4: IncomeInArray.cathegory = string; string = ""; break;
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
function addIncomeData(i){
	var string = "";
	string = string +"<b>id przychodu: </b>"+ incomesObj[i].id.toString();
	string = string +",<b> rozmiar przychodu: </b>"+ incomesObj[i].amount;
	string = string +",<b> data przychodu: </b>"+ incomesObj[i].date;
	string = string +",<b> kategoria przychodu: </b>"+ incomesObj[i].cathegory;
	string = string +",<b> komentarz: </b>"+ incomesObj[i].comment;
	return string;
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
	$('input[type=radio][name=expenceDelete]:checked').parent().remove();
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
}
function deleteCathegoryOfPayment(){
	var cathegoryOfPayment = $("input[type=radio][name=expenceMethodDelete]:checked").val();
	$('input[type=radio][name=expenceMethodDelete]:checked').parent().remove();
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
}
function addNewCathegoryOfIncome(){
	var addedCathegory = $('#addIncomeCathegoryTextInput').val();
	if(addedCathegory == "") {alert("Nie wprowadzono nowej kategorii!"); return;};
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
function deleteCathegoryOfIncome(){
	var cathegoryOfPayment = $("input[type=radio][name=incomeDeleteCathegoryInput]:checked").val();
	$('input[type=radio][name=incomeDeleteCathegoryInput]:checked').parent().remove();
	var marginTopOfButtons = $('#addIncomeButton').css('margin-top');
	marginTopOfButtons = parseInt(marginTopOfButtons) + 25;
	
	$('#addIncomeButton').css({'margin-top': marginTopOfButtons.toString() +'px'});
	$('#escapeIncomes').css({'margin-top': marginTopOfButtons.toString() +'px'});
	$('#showIncomeStorage').css({'margin-top': marginTopOfButtons.toString() +'px'});
	cathegoryOfPayment = deleteSpaces(cathegoryOfPayment);
	var element = document.getElementById(cathegoryOfPayment);
    element.parentNode.removeChild(element);
	
	alert("Usunięto wybraną kategorię płatności");
}
function loadIncomesFromArrayToDiv(){
	$('#lastIncomesLoaded').html("");
	var endOfArray = incomesObj.length-1;
	var string = "";
	var methodsString = "<fieldset id=\"deleteLastIncomesInLocalStorageFieldset\">";
	for (var i=endOfArray; i>endOfArray-3; i--){
		string=addIncomeData(i);
		methodsString += "<div><input type=\"radio\" name=\"incomeDeleteLocalStorageInput\" value=\"Income"+incomesObj[i].id + "\">"+ string +"</div>";
		if(i==0) break;
	}
	methodsString += "</fieldset>";
	$('#lastIncomesLoaded').append(methodsString);
}
function loadExpencesFromArrayToDiv(){
	$('#lastExpencesLoaded').html("");
	var endOfArray = expencesObj.length-1;
	var string = "";
	var methodsString = "<fieldset id=\"deleteLastExpencesInLocalStorageFieldset\">";
	for (var i=endOfArray; i>endOfArray-3; i--){
		string=addExpenceData(i);
		methodsString += "<div><input type=\"radio\" name=\"expenceDeleteLocalStorageInput\" value=\"Expence"+expencesObj[i].id + "\">"+ string +"</div>";
		if(i==0) break;
	}
	methodsString += "</fieldset>";
	$('#lastExpencesLoaded').append(methodsString);
}
function deleteIncomeInLocalStorage(){
	var incomeToDelete = $("input[type=radio][name=incomeDeleteLocalStorageInput]:checked").val();
	localStorage.removeItem(incomeToDelete);
	$("input[type=radio][name=incomeDeleteLocalStorageInput]:checked").parent().remove();
	incomesObj.splice(0,incomesObj.length);
	loadIncomesOfLoggedUser();
	alert("Usunięto wskazany przychód");
}
function deleteExpenceInLocalStorage(){
	var expenceToDelete = $("input[type=radio][name=expenceDeleteLocalStorageInput]:checked").val();
	localStorage.removeItem(expenceToDelete);
	$("input[type=radio][name=expenceDeleteLocalStorageInput]:checked").parent().remove();
	expencesObj.splice(0,expencesObj.length);
	loadExpencesOfLoggedUser();
	alert("Usunięto wskazany wydatek");
}
function adjustButtonPositionToDeletingLastInputs(){
	var incomesHeight = $('#lastIncomesLoaded').css('height');
	var expencesHeight = $('#lastExpencesLoaded').css('height');
	var heightOfHeaders = 132;
	var buttonsHeigth = 30;
	var totalHeight = parseInt(incomesHeight) + parseInt(expencesHeight) + heightOfHeaders + buttonsHeigth;
	if(totalHeight>=485){
		var difference = totalHeight - 485;
		var inputsConteinerHeight = parseInt($('#lastInputsMenuSetup').css('height')) + difference;
		var containerHeight = parseInt($('.setupContainer').css('height')) + difference;

		$('#lastInputsMenuSetup').css({'height': inputsConteinerHeight.toString() +'px'});
		$('.setupFunction').css({'height': inputsConteinerHeight.toString() +'px'});
		$('.setupContainer').css({'height': containerHeight.toString() +'px'});
	}
}
	function createTableOfExpences(timeSpan){
		$('#expenceTable').html("");
		let table = document.getElementById("expenceTable");
		let data = Object.keys(expencesObj[0]);
		generateExpenceTable(table, data, timeSpan);
		
	}
	function generateTableHead(table, data){
		let tHead = table.createTHead();
		let row = tHead.insertRow();
		for(let key of data){
			if(key == "userId") continue;
			let th = document.createElement("th");
			let text = document.createTextNode(key);
			th.appendChild(text);
			row.appendChild(th);
	}

	
}
	function generateExpenceTable(table, data, timeSpan) {
 	  
	var expencesSorted = [];
	var expencesFromTimeSpan = [];
	var dataPoints = [];
	
	var sumOfCathegoryAmount = 0;
	
	expencesFromTimeSpan = loadInputsOfTimeSpan(timeSpan, expencesFromTimeSpan, expencesObj);
	expencesSorted = sortExpencesByCathegory(expencesSorted, expencesFromTimeSpan);
	if(expencesSorted.length == 0) {
		$('#expenceTable').html("<div class=\"row\">Brak wydatków w rozpatrywanym okresie</div>");
		$('#expenceTable').css({'margin-left':'auto', 'margin-right': 'auto'});
		$('#chartExpencesContainer').css('heigth', '0px');
		return;
	}
	var cathegory = expencesSorted[0].source;
	let lastElement = expencesSorted.length - 1;
	for (let element of expencesSorted) {
		let temporary = element.source;
		if(cathegory != temporary){
			if(cathegory != temporary){
				let oneDataToChart = {
					y: 0,
					label: ""
				};
				oneDataToChart.y = sumOfCathegoryAmount;
				oneDataToChart.label = cathegory;
				dataPoints.push(oneDataToChart);
			
				addSummaryRow(table, cathegory, sumOfCathegoryAmount);
				cathegory = temporary;
				sumOfExpences += sumOfCathegoryAmount;
				sumOfCathegoryAmount = 0;
			}
		}
        let row = table.insertRow();
        for (var key in element) {
			if(key == "userId") continue;
			if(key == "amount") {sumOfCathegoryAmount += parseFloat(element.amount);};
          let cell = row.insertCell();
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
		if(element == expencesSorted[lastElement]){
			
				let oneDataToChart = {
					y: 0,
					label: ""
				};
				oneDataToChart.y = sumOfCathegoryAmount;
				oneDataToChart.label = cathegory;
				dataPoints.push(oneDataToChart);
			
				addSummaryRow(table, cathegory, sumOfCathegoryAmount);
				cathegory = temporary;
				sumOfExpences += sumOfCathegoryAmount;
				sumOfCathegoryAmount = 0;
			
		}
	}
	  for(var k=0; k<dataPoints.length; k++){
		  dataPoints[k].y = dataPoints[k].y/sumOfExpences * 100;
	  }
		var chart = new CanvasJS.Chart("chartExpencesContainer", {
			animationEnabled: true,
			title: {
				text: "Wydatki według kategorii"
			},
			data: [{
				type: "pie",
				startAngle: 240,
				yValueFormatString: "##0.00\"%\"",
				indexLabel: "{label} {y}",
				dataPoints
			}]
		});
		chart.render();
		$('#chartExpencesContainer').css('height', '400px');
		generateTableHead(table, data);
		
    }
	function addSummaryRow(table, cathegory, sumOfCathegoryAmount){
		let rowCathegory = table.insertRow();
		let cellCathegory = rowCathegory.insertCell();
		let text = document.createTextNode(cathegory);
		cellCathegory.appendChild(text);
		let cellAmount = rowCathegory.insertCell();
		let textSum = document.createTextNode(sumOfCathegoryAmount);
		cellAmount.appendChild(textSum);
		
	}
	
	function loadInputsOfTimeSpan(timeSpan, inputsFromTimeSpan, arrayWithInputs){
		
		var date = "";
		if(timeSpan =="lastMonth"){
			for(var i=0; i<arrayWithInputs.length; i++){
				date = arrayWithInputs[i].date;
				if(checkIfDateOfInputIsFromLastMonth(date)) {
					inputsFromTimeSpan.push(arrayWithInputs[i]);
				}
			}
		}
		else if (timeSpan == 'previousMonth'){
			for(var i=0; i<arrayWithInputs.length; i++){
				date = arrayWithInputs[i].date;
				if(checkIfDateOfInputIsFromPreviosMonth(date)) {
					inputsFromTimeSpan.push(arrayWithInputs[i]);
				}
			}
		}
		
		else if(timeSpan == 'lastYear'){
			for(var i=0; i<arrayWithInputs.length; i++){
				date = arrayWithInputs[i].date;
				if(checkIfDateOfInputIsFromPreviosYear(date)) {
					inputsFromTimeSpan.push(arrayWithInputs[i]);
				}
			}
		}
		else{
			var firstDate = $('#beginnigTimeSpan').val();
			var secondDate = $('#endingTimeSpan').val();
			if(checkIfDateOneIsOlder(secondDate, firstDate)){
				alert("Podana data końca okresu jest starsza niz data początku okresu. Podaj prawidłową datę");
				return;
			}
			for(var i=0; i<arrayWithInputs.length; i++){
				date = arrayWithInputs[i].date;
				if(checkIfDateOfInputIsFromTimeSpan(date)) {
					inputsFromTimeSpan.push(arrayWithInputs[i]);
				}
			}
		}
		return inputsFromTimeSpan;
	}
	
	function checkIfDateOfInputIsFromLastMonth(date){
		var d = new Date();
		var month = d.getMonth()+1;
		var year = d.getFullYear();
		var inputMonth = date.substr(5,2);
		var inputYear = date.substr(0,4);
		if(inputMonth == month && inputYear == year) return true;
		else return false;
	}
	function checkIfDateOfInputIsFromPreviosMonth(date){
		var d = new Date();
		var month = d.getMonth();
		var year = d.getFullYear();
		if (month == 0){
			month = 12;
			year-=1;
		}
		var inputMonth = date.substr(5,2);
		var inputYear = date.substr(0,4);
		if(inputMonth == month && inputYear == year) return true;
		else return false;
	}
	function checkIfDateOfInputIsFromPreviosYear(date){
		var d = new Date();
		var year = d.getFullYear();
		var inputYear = date.substr(0,4);
		if(inputYear == year) return true;
		else return false;
	}
	function checkIfDateOfInputIsFromTimeSpan(date){
		var firstDate = $('#beginnigTimeSpan').val();
		var secondDate = $('#endingTimeSpan').val();
		if(checkIfDateOneIsOlder(date, firstDate) == false && checkIfDateOneIsOlder(date, secondDate)==true) return true;
		else return false;
	}
	function checkIfDateOneIsOlder(dateOne, dateTwo){
		if(dateOne.substr(0,4) < dateTwo.substr(0,4)) return true;
		else if(dateOne.substr(0,4) > dateTwo.substr(0,4)) return false;
		else{
			if(dateOne.substr(5,2) < dateTwo.substr(5,2)) return true;
			else if(dateOne.substr(5,2) > dateTwo.substr(5,2)) return false;
			else{
				if(dateOne.substr(8,2) < dateTwo.substr(8,2)) return true;
				else return false;
			}
		}
	}
	function sortExpencesByCathegory(expencesSorted, expencesFromTimeSpan){
		var cathegory="";
		for(let i=0; i<expencesFromTimeSpan.length; i++){
			cathegory = expencesFromTimeSpan[i].source;
			if(checkIfCathegoryIsAlreadyIncluded(cathegory,expencesSorted)) continue;
			var temporary = [];
			for(let k=0; k<expencesFromTimeSpan.length; k++){
				if(cathegory==expencesFromTimeSpan[k].source){
					temporary.push(expencesFromTimeSpan[k]);
				}
			}
			temporary.sort(function(a,b){
				return new Date(b.date) - new Date(a.date);
				});
			Array.prototype.push.apply(expencesSorted,temporary);
			temporary.splice(0,temporary.length);
		}
		return expencesSorted;
	}
	function checkIfCathegoryIsAlreadyIncluded(cathegory,inputsSorted){
		for (let i=0; i<inputsSorted.length; i++){
			if (cathegory == inputsSorted[i].source || cathegory == inputsSorted[i].cathegory) return true;
		}
		return false;
	}
	function adjustSummaryButtonPosition(){
		var tableExpencesHeight = parseInt($('#expenceTable').css('height'));
		var tableIncomesHeight = parseInt($('#incomeTable').css('height'));
		var chartsHeight = parseInt($('#chartIncomesContainer').css('height')) + parseInt($('#chartExpencesContainer').css('height'));
		var sumHeight = tableExpencesHeight + tableIncomesHeight + chartsHeight;
		if(sumHeight < 420){
			var buttonMargin = parseInt($('#escapeSummary').css('margin-top'));
			buttonMargin -= sumHeight;
			$('#escapeSummary').css({
				'margin-top': buttonMargin.toString() + 'px'
				});
		}
		else{
			var extension = tableExpencesHeight + tableIncomesHeight - 400;
			var containerHeight = 660 + extension + chartsHeight;
			var heightToSet = containerHeight.toString() + "px";
			$('.summaryContainer').css({'height': containerHeight.toString() +'px'});
			$('#escapeSummary').css({
				'margin-top': '10px'
				});	
		}
		
	}
function createTableOfIncomes(timeSpan){
	$('#incomeTable').html("");
	let table = document.getElementById("incomeTable");
	let data = Object.keys(incomesObj[0]);
	generateIncomesTable(table, data, timeSpan);
}
function generateIncomesTable(table, data, timeSpan) {
     
	var incomesSorted = [];
	var incomesFromTimeSpan = [];
	var dataPoints = [];
	var sumOfCathegoryAmount = 0;
	incomesFromTimeSpan = loadInputsOfTimeSpan(timeSpan, incomesFromTimeSpan, incomesObj);
	incomesSorted = sortIncomesByCathegory(incomesSorted, incomesFromTimeSpan);
	
	if(incomesSorted.length == 0) {
		$('#incomeTable').html("<div class=\"row\">Brak przychodów w rozpatrywanym okresie</div>");
		$('#chartIncomesContainer').css('heigth', '0px');
		return;
	}
	var cathegory = incomesSorted[0].cathegory;
	let lastElement = incomesSorted.length - 1;
	for (let element of incomesSorted) {
		let temporary = element.cathegory;
		if(cathegory != temporary){
			let oneDataToChart = {
				y: 0,
				label: ""
			};
			oneDataToChart.y = sumOfCathegoryAmount;
			oneDataToChart.label = cathegory;
			dataPoints.push(oneDataToChart);
			
			addSummaryRow(table, cathegory, sumOfCathegoryAmount);
			cathegory = temporary;
			sumOfIncomes += sumOfCathegoryAmount;
			sumOfCathegoryAmount = 0;
		}
        let row = table.insertRow();
        for (var key in element) {
			if(key == "userId") continue;
			if(key == "amount") {sumOfCathegoryAmount+= parseFloat(element.amount);};
          let cell = row.insertCell();
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
		if(element == incomesSorted[lastElement])
		{
			let oneDataToChart = {
				y: 0,
				label: ""
			};
			oneDataToChart.y = sumOfCathegoryAmount;
			oneDataToChart.label = cathegory;
			dataPoints.push(oneDataToChart);
			
			addSummaryRow(table, cathegory, sumOfCathegoryAmount);
			cathegory = temporary;
			sumOfIncomes += sumOfCathegoryAmount;
			sumOfCathegoryAmount = 0;
		}
      }
	  
	  for(var k=0; k<dataPoints.length; k++){
		  dataPoints[k].y = dataPoints[k].y/sumOfIncomes * 100;
	  }
		var chart = new CanvasJS.Chart("chartIncomesContainer", {
			animationEnabled: true,
			title: {
				text: "Przychody według kategorii"
			},
			data: [{
				type: "pie",
				startAngle: 240,
				yValueFormatString: "##0.00\"%\"",
				indexLabel: "{label} {y}",
				dataPoints
			}]
		});
		chart.render();
	    $('#chartIncomesContainer').css('height', '400px');
		generateTableHead(table, data);			    
    }
function sortIncomesByCathegory(incomesSorted, incomesFromTimeSpan){
		var cathegory="";
		for(let i=0; i<incomesFromTimeSpan.length; i++){
			cathegory = incomesFromTimeSpan[i].cathegory;
			if(checkIfCathegoryIsAlreadyIncluded(cathegory,incomesSorted)) continue;
			var temporary =[];
			for(let k=0; k<incomesFromTimeSpan.length; k++){
				if(cathegory==incomesFromTimeSpan[k].cathegory){
					temporary.push(incomesFromTimeSpan[k]);
				}
			}
			temporary.sort(function(a,b){
				return new Date(b.date) - new Date(a.date);
				});
			Array.prototype.push.apply(incomesSorted,temporary);
			temporary.splice(0,temporary.length);
		}
		return incomesSorted;
		
	}
function prepareSummaryBoard() {
	var chosenSpan = $('#dateSpan').val();
	sumOfIncomes = 0;
	sumOfExpences = 0;
	$('#expenceTable').html("");
	$('#incomeTable').html("");
	$('#chartExpencesContainer').html("");
	$('#chartIncomesContainer').html("");
	$('#chartIncomesContainer').css('height', '0px');
	$('#chartExpencesContainer').css('height', '0px');
	$('.sumUpDiv').html("");
	$('.sumUpDiv').css({'height': '0px'});
	$('.summaryContainer').css({
				'height': '600px'
				});
	if(chosenSpan=='nonStandardSpan'){
		$('#nonStandardDateInput').css({
			'display':'block',
			'color':'white'
		});
		
		$('#escapeSummary').css('margin-top', '340px');
	}
	else{
		$('#nonStandardDateInput').css({
			'display':'none'
		});
		
		$('#escapeSummary').css({
			'margin-top': '385px'
			});
	}
}
function evaluateFinanceManagement(){
	var sumOfMoney = sumOfIncomes - sumOfExpences;
	$('.sumUpDiv').css({'height': '30px'});
	var sumDivContent = $('.sumUpDiv').html();
	if(sumOfMoney >= 0){
		sumDivContent = "Gratulacje! Świetnie sobie radzisz z zarządzaniem swoimi pieniędzmi";
		background = 'radial-gradient(#126110 10%,#2b8c29 50%,#529e51 80%)';
	}
	else{
		sumDivContent = "Niestety! Suma twoich wydatków przekroczyła sumę przychodów";
		background = 'radial-gradient(#941e16 10%,#a8342c 50%,#bf524b 80%)';
	}
	$('.sumUpDiv').html(sumDivContent);
	$('.sumUpDiv').css({'background': background});
}