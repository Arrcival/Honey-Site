$(document).ready(function() {
    $('div[id^="exercise"]').each(function() {
        var id = $(this).attr('id');
        $(this).find("button").click(function () {
            window.location = "exercise.html?exercise=" + id
        })
    });
});


async function manageIcons()
{
    if(!isUsernameValid() && $('div[id^="exercise"]').length)
    {
        console.log("user not logged in or not homepage")
        return;
    }
	$('div[id^="exercise"]').each(function() {
		$(this).find("i").removeClass("icon-times-circle-o").removeClass("icon-check-circle-o").addClass("icon-circle-o")
	});

	var results = await getResultsExercise()
	var diffResults = results.split("\n")
    
	for(var i = 0; i < diffResults.length; i++)
	{
		if(diffResults[i] == "") break;
		currentResult = diffResults[i].split("/")
		exercise = currentResult[0]
		result = currentResult[1]

		if(result == 1)
			$('div[id="' + exercise + '"]').find("i").removeClass("icon-circle-o").addClass("icon-times-circle-o")
		if(result == 2)
			$('div[id="' + exercise + '"]').find("i").removeClass("icon-circle-o").addClass("icon-check-circle-o")			
	}	
}

async function getResultsExercise() {
  
    apiRoute = `getResultsExercise/${username}`;
	returnresult = 0;
    apiLoading();
    await fetch(apiUrl + apiRoute,
    {
        headers: myHeaders,
        method: "GET"
    })
    .then(function(response) {
        return response.text()
    })
    .then(function(text) {
        returnresult = text;
        apiSuccess();
    })
    .catch((error) => {
        console.log(error)
        apiFailure();
    });

	return returnresult
}