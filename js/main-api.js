var username = ""

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'text/plain')
myHeaders.append('Accept', 'application/json')
myHeaders.append('X-Api-Key', '804a0298-a338-4489-a3df-0e9c11f61a70')

var myInit = { 
	method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    origin: '*'
};

//var apiUrl = "https://arrcival.eu.pythonanywhere.com/"
//var apiUrl = "http://127.0.0.1:5000/"
var apiUrl = "https://honeylearning.herokuapp.com/"
