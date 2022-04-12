

async function updateUserReussites() {
  
	apiRoute = "getAmountExercises/" + username;

  	await fetch(apiUrl + apiRoute,
	{
		headers: myHeaders,
		method: "GET"
	})
  	.then(function(response) {
	  	return response.text()
  	})
  	.then(function(text) {
	  	document.getElementById("reussiteCount").innerHTML = text;  
  	})
	.catch((error) => {
		console.log(error)
		document.getElementById("reussiteCount").innerHTML = "x";  
	});
}   


function isUsernameValid()
{
	return username != null && username.length >= 4
}

$(document).ready(async function() {
	username = localStorage.getItem("honeyLearningUsername")
	if(isUsernameValid())
	{
		document.getElementById("username").value = username
		await updateUserReussites()
		await tryManagingIcons()
	}
})

$('#username').keypress(async function(event) {
	var keycode = event.keyCode || event.which;
	if(keycode == '13') {
		username = document.getElementById("username").value;
		localStorage.setItem("honeyLearningUsername", username)
		if(isUsernameValid(username))
		{
			await updateUserReussites()
			await tryManagingIcons()
		} else
		{
			alert("Le nom d'utilisateur doit être supérieur ou égal à 4 caractères.")
		}
	}
});


async function tryManagingIcons() {
	if($('div[id^="exercise"]').length)
		await manageIcons()
}