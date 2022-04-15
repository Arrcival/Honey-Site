
async function runTests(btn) {

	if(!isUsernameValid(username))
	{
		alert("Put your name in the left sidebar :)")
		return;
	}
  	btn.style.display = "none";
  	document.getElementById("runResults").innerHTML = "Running...";
    
	var exerciseName = document.getElementById("questionId").innerText
	apiRoute = `exercise/${exerciseName}/${username}`;

	var codeInput = document.getElementById("codeArea").value;
  
  	fetch(apiUrl + apiRoute,
	{
		headers: myHeaders,
		method: "POST",
		body: codeInput
	})
  	.then(function(response) {
    	return response.text()
  	})
  	.then(async function(text) {
  		document.getElementById("runResults").innerHTML = text;
		await updateUserReussites()
		await doBooleanResult(exerciseName)
  	})
	.catch((error) => {
		console.log(error)
		document.getElementById("runResults").innerHTML = "";
	})
  	.finally(function(){
      	btn.style.display = "initial";
  	});
	
}   

$(document).ready(async function() {
	var queryString = window.location.search;
	var urlParams = new URLSearchParams(queryString);
	var exercise_name = urlParams.get('exercise')

	var result = await getExercise(exercise_name);

	$("div[id=questionContainer]").append(result)
	if(result != "" && isUsernameValid())
	{
		var result = await getExerciseResult(exercise_name)
		if(result != "")
		{
			var success = result.split("\n")[0]
			manageBar(success === "True")
			var userCode = result.replace(success + "\n", "")
			document.getElementById("codeArea").value = userCode;
		}
	}
})

async function resetArea()
{
	var result = await getExercise(document.getElementById("questionId").innerText);
	$("div[id=questionContainer]").empty().append(result)
}

async function getExercise(exercise_name) {
  
	apiRoute = "getExercise/" + exercise_name;

	result = "";
  	await fetch(apiUrl + apiRoute,
	{
		headers: myHeaders,
		method: "GET"
	})
  	.then(function(response) {
	  	return response.text()
  	})
  	.then(function(text) {
	  	result = text
  	})
	.catch((error) => {
		console.log(error)
	});
	return result
}   

async function getExerciseResult(exercise_name) {
  
	apiRoute = `getExerciseResult/${exercise_name}/${username}`;

	result = ""
  	await fetch(apiUrl + apiRoute,
	{
		headers: myHeaders,
		method: "GET"
	})
  	.then(function(response) {
        return response.text();
  	})
  	.then(function(text) {
	  	result = text
  	})
	.catch((error) => {
		console.log(error)
	});
	return result
}   

async function doBooleanResult(exercise_name) {

	apiRoute = `getBooleanExerciseResult/${document.getElementById("questionId").innerText}/${username}`;
  
  	fetch(apiUrl + apiRoute,
	{
		headers: myHeaders,
		method: "GET"
	})
  	.then(function(response) {
    	return response.text()
  	})
  	.then(async function(text) {
		manageBar(text == "2")
  	})
	.catch((error) => {
		console.log(error)
	})
}

function manageBar(success)
{
	if(success)
	{
		$('div[id="enonceRow"]').removeClass("enonceNotDone enonceProgress").addClass("enonceDone")
	}
	else
	{
		$('div[id="enonceRow"]').removeClass("enonceNotDone enonceDone").addClass("enonceProgress")
	}
}