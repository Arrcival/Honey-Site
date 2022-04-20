var username = ""

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'text/plain')
myHeaders.append('Accept', 'application/json')
myHeaders.append('X-Api-Key', '804a0298-a338-4489-a3df-0e9c11f61a70')

var apiUrl = "https://honeylearning.herokuapp.com/"

function apiLoading()
{
    $("#apiFailure").hide();
    $("#apiSuccess").hide();
    $("#apiLoading").show();
}

function apiSuccess()
{
    $("#apiFailure").hide();
    $("#apiSuccess").show();
    $("#apiLoading").hide();
}

function apiFailure()
{
    $("#apiFailure").show();
    $("#apiSuccess").hide();
    $("#apiLoading").hide();
}