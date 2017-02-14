var imgList;
var imgCardBack;


var cards = [];
var activity;
var playercount;

var playerCards = [];
var player;

var middleCards = [];

var playerList = [];

var btnSchieben, btnKlopfen, btnZug_beendet, btnSwitchAllCards;

var rundenCounter = 1;

var zugGemacht = false;
var switchedAllCards = false;
var resetCards1 = [];
var resetCards2 = [];

var tmpValue;

var textInput = "";

//var socket = undefined;

function setup() {
	createCanvas(900, 600);
	imgList = [loadImage("Card_Images/7_of_spades.png"), loadImage("Card_Images/8_of_spades.png"), loadImage("Card_Images/9_of_spades.png"), loadImage("Card_Images/10_of_spades.png"), loadImage("Card_Images/jack_of_spades2.png"), loadImage("Card_Images/queen_of_spades2.png"), loadImage("Card_Images/king_of_spades2.png"), loadImage("Card_Images/ace_of_spades2.png"),
	loadImage("Card_Images/7_of_diamonds.png"), loadImage("Card_Images/8_of_diamonds.png"), loadImage("Card_Images/9_of_diamonds.png"), loadImage("Card_Images/10_of_diamonds.png"), loadImage("Card_Images/jack_of_diamonds2.png"), loadImage("Card_Images/queen_of_diamonds2.png"), loadImage("Card_Images/king_of_diamonds2.png"), loadImage("Card_Images/ace_of_diamonds.png"),
	loadImage("Card_Images/7_of_clubs.png"), loadImage("Card_Images/8_of_clubs.png"), loadImage("Card_Images/9_of_clubs.png"), loadImage("Card_Images/10_of_clubs.png"), loadImage("Card_Images/jack_of_clubs2.png"), loadImage("Card_Images/queen_of_clubs2.png"), loadImage("Card_Images/king_of_clubs2.png"), loadImage("Card_Images/ace_of_clubs.png"),
	loadImage("Card_Images/7_of_hearts.png"), loadImage("Card_Images/8_of_hearts.png"), loadImage("Card_Images/9_of_hearts.png"), loadImage("Card_Images/10_of_hearts.png"), loadImage("Card_Images/jack_of_hearts2.png"), loadImage("Card_Images/queen_of_hearts2.png"), loadImage("Card_Images/king_of_hearts2.png"), loadImage("Card_Images/ace_of_hearts.png")];

	imgCardBack = loadImage("Card_Images/Card_backside.png");

	this.cards = [new Card(7, "PIK", imgList[0], "SIEBEN"), new Card(8, "PIK", imgList[1], "ACHT"), new Card(9, "PIK", imgList[2], "NEUN"), new Card(10, "PIK", imgList[3], "ZEHN"), new Card(10, "PIK", imgList[4], "BUBE"), new Card(10, "PIK", imgList[5], "DAME"), new Card(10, "PIK", imgList[6], "KOENIG"), new Card(11, "PIK", imgList[7], "ASS"),
	new Card(7, "KARO", imgList[8], "SIEBEN"), new Card(8, "KARO", imgList[9], "ACHT"), new Card(9, "KARO", imgList[10], "NEUN"), new Card(10, "KARO", imgList[11], "ZEHN"), new Card(10, "KARO", imgList[12], "BUBE"), new Card(10, "KARO", imgList[13], "DAME"), new Card(10, "KARO", imgList[14], "KOENIG"), new Card(11, "KARO", imgList[15], "ASS"),
	new Card(7, "KREUZ", imgList[16], "SIEBEN"), new Card(8, "KREUZ", imgList[17], "ACHT"), new Card(9, "KREUZ", imgList[18], "NEUN"), new Card(10, "KREUZ", imgList[19], "ZEHN"), new Card(10, "KREUZ", imgList[20], "BUBE"), new Card(10, "KREUZ", imgList[21], "DAME"), new Card(10, "KREUZ", imgList[22], "KOENIG"), new Card(11, "KREUZ", imgList[23], "ASS"),
	new Card(7, "HERZ", imgList[24], "SIEBEN"), new Card(8, "HERZ", imgList[25], "ACHT"), new Card(9, "HERZ", imgList[26], "NEUN"), new Card(10, "HERZ", imgList[27], "ZEHN"), new Card(10, "HERZ", imgList[28], "BUBE"), new Card(10, "HERZ", imgList[29], "DAME"), new Card(10, "HERZ", imgList[30], "KOENIG"), new Card(11, "HERZ", imgList[31], "ASS")];


	btnSchieben = createButton("SCHIEBEN");
	btnSchieben.position(width-280, height+80);
	btnKlopfen = createButton("KLOPFEN");
	btnKlopfen.position(width-180, height+80);
	btnSwitchAllCards = createButton("TAKE_ALL");
	btnSwitchAllCards.position(width-90, height+80);
	btn_OnNewGame = createButton("NEUES_SPIEL");
	btn_OnNewGame.position(width-110, height/4);
	
	//hier sind die Button-Pressed Events
	btnSchieben.mousePressed(schieben);
	btnKlopfen.mousePressed(klopfen);
	btnSwitchAllCards.mousePressed(switchAllCards);
	btn_OnNewGame.mousePressed(onGame);

	socket = io.connect();
	
	// We make a named event called 'deal' and write an
	// anonymous callback function
	socket.on('deal',
		// When we receive data
		function(data) {
			console.log("Dealed cards: " + data);
			playerCards = [cards[data[0]], cards[data[1]], cards[data[2]]];
			player = new Player(playerCards);
			zugGemacht = false;
			switchedAllCards = false;
			
		}
	);
	
	socket.on('middle',
	// When we receive data
	function(data) {
		console.log("Middle cards: " + data);
		if(data.length == 3)
		{
			middleCards = [cards[data[0]], cards[data[1]], cards[data[2]]];
		}
		else
		{
			middleCards = [];
		}
	}
	);
	
	socket.on('playercount',
	    function(players) {
			console.log("Show player2 cards on canvas.");
			playercount = players;
		}		
	);
	
	socket.on('message',                                                  
		function(live){
			if(live == socket.id) {
				activity = true;
				zugGemacht = false;
				switchedAllCards = false;
				console.log("I am activ" );
				
			}
			else {
				activity = false;
				console.log("I am not activ" );
			}	
		}
	);


	socket.on('runde', function(runde) {
		rundenCounter = runde;
	});

	socket.on('spielende', function(tmp) {
		textInput = tmp;
	});

	socket.on('textInput', function(tmp) {
		textInput = tmp;
	});

}


function schieben() {
	if(activity == true)
	{
		zugGemacht = true;
		switchedAllCards = true;
		//socket.emit('geschoben');
		onMiddleChanged();
	}
}

function klopfen() {
	if(activity == true)
	{
		zugGemacht = true;
		switchedAllCards = true;
		socket.emit('geklopft');
		onMiddleChanged();
	}
}


function switchAllCards() {
	if(activity == true)
	{
		if(switchedAllCards == false && zugGemacht == false) {
			var tmp = player.cards;
			player.cards = middleCards;
			middleCards = tmp;
			switchedAllCards = true;
			onMiddleChanged();
		}
	}
}

function mouseDragged() {
	if(activity == false)
	{
		zugGemacht = true;
		switchedAllCards = true;
	}
		var d1 = dist(mouseX, mouseY, this.player.cards[0].pos1.x, this.player.cards[0].pos1.y);
		var d2 = dist(mouseX, mouseY, this.player.cards[1].pos2.x, this.player.cards[1].pos2.y);
		var d3 = dist(mouseX, mouseY, this.player.cards[2].pos3.x, this.player.cards[2].pos3.y);
		switchCard(d1, d2, d3);
	
}

function switchCard(d1, d2, d3) {
	if(d1 < 30) {
		this.player.cards[0].pos1 = new p5.Vector(mouseX, mouseY);
		var d1 = dist(mouseX, mouseY, this.middleCards[0].middlePos1.x, this.middleCards[0].middlePos1.y);
		var d2 = dist(mouseX, mouseY, this.middleCards[1].middlePos2.x, this.middleCards[1].middlePos2.y);
		var d3 = dist(mouseX, mouseY, this.middleCards[2].middlePos3.x, this.middleCards[2].middlePos3.y);
		var tmp = this.player.cards[0];
		if(d1 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player.cards[0] = this.middleCards[0];
			this.middleCards[0] = tmp;
			this.zugGemacht = true;
		} else if(d2 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player.cards[0] = this.middleCards[1];
			this.middleCards[1] = tmp;
			this.zugGemacht = true;
		} else if(d3 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player.cards[0] = this.middleCards[2];
			this.middleCards[2] = tmp;
			this.zugGemacht = true;
		}
	}
	else if(d2 < 30) {
		this.player.cards[1].pos2 = new p5.Vector(mouseX, mouseY);
		var d1 = dist(mouseX, mouseY, this.middleCards[0].middlePos1.x, this.middleCards[0].middlePos1.y);
		var d2 = dist(mouseX, mouseY, this.middleCards[1].middlePos2.x, this.middleCards[1].middlePos2.y);
		var d3 = dist(mouseX, mouseY, this.middleCards[2].middlePos3.x, this.middleCards[2].middlePos3.y);
		var tmp = this.player.cards[1];
		if(d1 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player.cards[1] = this.middleCards[0];
			this.middleCards[0] = tmp;
			this.zugGemacht = true;
		} else if(d2 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player.cards[1] = this.middleCards[1];
			this.middleCards[1] = tmp;
			this.zugGemacht = true;
		} else if(d3 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player.cards[1] = this.middleCards[2];
			this.middleCards[2] = tmp;
			this.zugGemacht = true;
		}
	} 
	else if(d3 < 30) {
		this.player.cards[2].pos3 = new p5.Vector(mouseX, mouseY);
		var d1 = dist(mouseX, mouseY, this.middleCards[0].middlePos1.x, this.middleCards[0].middlePos1.y);
		var d2 = dist(mouseX, mouseY, this.middleCards[1].middlePos2.x, this.middleCards[1].middlePos2.y);
		var d3 = dist(mouseX, mouseY, this.middleCards[2].middlePos3.x, this.middleCards[2].middlePos3.y);
		var tmp = this.player.cards[2];
		if(d1 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player.cards[2] = this.middleCards[0];
			this.middleCards[0] = tmp;
			zugGemacht = true;
		} else if(d2 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player.cards[2] = this.middleCards[1];
			this.middleCards[1] = tmp;
			this.zugGemacht = true;
		} else if(d3 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player.cards[2] = this.middleCards[2];
			this.middleCards[2] = tmp;
			this.zugGemacht = true;
		}
	}
	if(zugGemacht == true)
	{
		onMiddleChanged();
	}
}

function draw() {
	background(40, 100, 40);
 	
	if(this.player !== undefined)
	{
		textStyle(BOLD);
		textSize(30);
		text(textInput, width/3-50, height/9);
		textSize(18);
		text("RUNDE: " + rundenCounter, 80, 70);
		text("WERT : " + this.player.berechneValue(), 80, 100);
		//socket.emit('value', tmpValue);
	}


	if(this.middleCards.length !== 0)
	{
		//show card deck on canvas
		this.middleCards[0].showCardDeck(imgCardBack);

		//show middle cards on canvas
		this.middleCards[0].showMiddleCard1();
		this.middleCards[1].showMiddleCard2();
		this.middleCards[2].showMiddleCard3();
	}
	
	if(this.player !== undefined)
	{
		//show player cards on canvas
		this.player.cards[0].showCard1();
		this.player.cards[1].showCard2();
		this.player.cards[2].showCard3();
	}
	
	if (this.playercount == 2) {
		//show player2 cards on canvas
		this.player.cards[0].showP2Card1(imgCardBack);
		this.player.cards[0].showP2Card2(imgCardBack);
		this.player.cards[0].showP2Card3(imgCardBack);
	}

}

function onMiddleChanged()
{
	var data = [cards.indexOf(this.middleCards[0]), cards.indexOf(this.middleCards[1]), cards.indexOf(this.middleCards[2])];
	tmpValue = this.player.berechneValue();
	socket.emit('value', tmpValue);
	socket.emit('middle', data);
}

function onGame() {
	socket.emit('newGame');
}