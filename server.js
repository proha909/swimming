// Using express: http://expressjs.com/
var express = require('express');

var shuffle = require('shuffle-array');
var live;
var sockets = [];
var players = 0;
var runde = 1;
var zaehler = 1;
var zugCounter = 0;
var geklopft = false;
var geschoben = 0;

var schieben = false;

var schiebenCounterP1 = false;
var schiebenCounterP2 = false;

var gewonnen = "DU HAST GEWONNEN!";
var verloren = "DU HAST LEIDER VERLOREN..";


var tmp;
var player1;
var player2;
var punktePlayer1 = 0;
var punktePlayer2  = 0;

// Create the app
var app = express();

var cards = [];

onNewGame();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 8080, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('schwimmen/'));


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {
  
    console.log("We have a new client: " + socket.id);

		
	var data = [];
	for (var i = 2; i >= 0; i--) {
		data.push(cards[i]);
		cards.splice(i, 1);
	}
	// Deal cards to client
	console.log('Client cards ' + data);
	socket.emit('deal', data);
	
	players++;
	sockets.push(socket);

	
	if(players == 2)
	{
		var mid = [];
		for (var i = 2; i >= 0; i--) {
			mid.push(cards[i]);
			cards.splice(i, 1);
		}
		io.sockets.emit('middle', mid);                                                           
	}
	
	if (players == 2)
	{	
		console.log("Show player2 cards on canvas.");
		io.sockets.emit('playercount', players);
		live = sockets[0];
		io.sockets.emit('message', live.id);
	}
	
	
	socket.on('middle',
	// When we receive data                                         
	function(data) {
		if(live.id == socket.id)
		{
			console.log("Middle cards update: " + data);
			socket.broadcast.emit('middle', data);                      
			
			var idx = sockets.indexOf(live);
			idx++;
			if(idx == sockets.length)
			{
				idx = 0;
			}
			live = sockets[idx];
			console.log('Active client id ' + live.id);
			io.sockets.emit('message', live.id);
			zugCounter++;

			if(schieben) {
				if(socket.id == sockets[0].id) {
					schiebenCounterP1 = false;
				} else if(socket.id == sockets[1].id) {
					schiebenCounterP2 = false;
				}
			}

			if(geklopft) {
				if(zaehler == 0) {
					if(punktePlayer1 > punktePlayer2) {
						//if(player1 == socket.id) {
							sockets[0].emit('spielende', gewonnen);
							sockets[1].emit('spielende', verloren);
						//}
						console.log("PLAYER 1: " + player1 + " hat GEWONNEN!");
					} else if(punktePlayer1 == punktePlayer2) {
						var unentschieden = "UNENTSCHIEDEN!";
						io.sockets.emit('spielende', unentschieden);
						console.log("UNENTSCHIEDEN!");
					} else {
						//if(player2 == socket.id) {
							sockets[0].emit('spielende', verloren);
							sockets[1].emit('spielende', gewonnen);
						//}
						console.log("PLAYER 2: " + player2 + " hat GEWONNEN!");
					}
					geklopft = false;
				}
				zaehler--;
			}
			if(zugCounter == 2) {
				zugCounter = 0;
				runde++;
				io.sockets.emit('runde', runde);
			}
		}
		else
		{
			//console.log("Middle cards update: failed request")
		}
	}
	);


	socket.on('value', function(punkte) {
		//console.log(">>>>>>>>Punkte: " + punkte);
		if(socket.id == player1) {
			punktePlayer1 = punkte;
		} else if(socket.id == player2){
			punktePlayer2 = punkte;
		}
	});


    socket.on('geklopft', function() {
    	geklopft = true;
    	if(socket.id == sockets[0].id) {
    		player1 = socket.id;
    		player2 = sockets[1].id;
    	} else if(socket.id == sockets[1].id) {
    		player2 = socket.id;
    		player1 = sockets[0].id;
    	}
    });

	socket.on('geschoben', function() {
		schieben = true;
		if(socket.id == sockets[0].id) {
    		schiebenCounterP1 = true;
    	} else if(socket.id == sockets[1].id) {
    		schiebenCounterP2 = true;
    	}

    	if(schiebenCounterP1 && schiebenCounterP2) {
			var mid = [];
			for (var i = 2; i >= 0; i--) {
				mid.push(cards[i]);
				cards.splice(i, 1);
			}
			io.sockets.emit('middle', mid);
		}
    });


    socket.on('disconnect', function() {
		console.log("Client has disconnected");
		players--;
		sockets.splice(sockets.indexOf(socket), 1);
		onNewGame();
    });

    socket.on('newGame', function() {
    	console.log('New Game');
    	onNeuesSpiel();
    });
  }
);

function onNewGame()
{
	cards = [];
	for (var k = 0; k < 32; k++) {
		cards.push(k);
	}
	cards = shuffle(cards);

	for(var i = 0; i < sockets.length; i++)
	{
		console.log('Socket  ' + sockets[0]);
		
		var data = [];
		
		for (var j = 2; j >= 0; j--) {
			data.push(cards[j]);
			cards.splice(j, 1);
		}
		// Deal cards to client
		sockets[i].emit('deal', data);
		sockets[i].emit('middle', []);
		sockets[i].emit('playercount', this.players);
	}
}

function onNeuesSpiel() {
	if(players == 2) {
		onNewGame();
		var mid = [];
		for (var i = 2; i >= 0; i--) {
			mid.push(cards[i]);
			cards.splice(i, 1);
		}
		io.sockets.emit('middle', mid);
		io.sockets.emit('playercount', players);
		live = sockets[0];
	} else {
		onNewGame();
	}
	resetVars();

	io.sockets.emit('runde', runde);
}

function resetVars() {
	zugCounter = 0;
	runde = 1;
	zaehler = 1;
	geklopft = false;
	var textInput = "";
	io.sockets.emit('textInput', textInput);
}