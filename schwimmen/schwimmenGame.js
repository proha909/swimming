var imgList;
var imgCardBack;

var player1Cards = [];
var player1;

var player2Cards = [];
var player2;

var middleCards = [];

var playerList = [];

var btnSchieben, btnKlopfen, btnZug_beendet, btnSwitchAllCards;

var rundenCounter = 1;

var zugGemacht = false;
var switchedAllCards = false;
var resetCards1 = [];
var resetCards2 = [];

function setup() {
	createCanvas(900, 600);
	imgList = [loadImage("Card_Images/7_of_spades.png"), loadImage("Card_Images/8_of_spades.png"), loadImage("Card_Images/9_of_spades.png"), loadImage("Card_Images/10_of_spades.png"), loadImage("Card_Images/jack_of_spades2.png"), loadImage("Card_Images/queen_of_spades2.png"), loadImage("Card_Images/king_of_spades2.png"), loadImage("Card_Images/ace_of_spades2.png"),
	loadImage("Card_Images/7_of_diamonds.png"), loadImage("Card_Images/8_of_diamonds.png"), loadImage("Card_Images/9_of_diamonds.png"), loadImage("Card_Images/10_of_diamonds.png"), loadImage("Card_Images/jack_of_diamonds2.png"), loadImage("Card_Images/queen_of_diamonds2.png"), loadImage("Card_Images/king_of_diamonds2.png"), loadImage("Card_Images/ace_of_diamonds.png"),
	loadImage("Card_Images/7_of_clubs.png"), loadImage("Card_Images/8_of_clubs.png"), loadImage("Card_Images/9_of_clubs.png"), loadImage("Card_Images/10_of_clubs.png"), loadImage("Card_Images/jack_of_clubs2.png"), loadImage("Card_Images/queen_of_clubs2.png"), loadImage("Card_Images/king_of_clubs2.png"), loadImage("Card_Images/ace_of_clubs.png"),
	loadImage("Card_Images/7_of_hearts.png"), loadImage("Card_Images/8_of_hearts.png"), loadImage("Card_Images/9_of_hearts.png"), loadImage("Card_Images/10_of_hearts.png"), loadImage("Card_Images/jack_of_hearts2.png"), loadImage("Card_Images/queen_of_hearts2.png"), loadImage("Card_Images/king_of_hearts2.png"), loadImage("Card_Images/ace_of_hearts.png")];

	imgCardBack = loadImage("Card_Images/Card_backside.png");

	btnSchieben = createButton("SCHIEBEN");
	btnSchieben.position(width-250, height-30);
	btnKlopfen = createButton("KLOPFEN");
	btnKlopfen.position(width-160, height-30);
	//btnZug_beendet = createButton("ZUG BEENDET");
	//btnZug_beendet.position(width-100, height-60);
	btnSwitchAllCards = createButton("TAKE_ALL");
	btnSwitchAllCards.position(width-80, height-30);


	this.cards = [new Card(7, "PIK", imgList[0], "SIEBEN"), new Card(8, "PIK", imgList[1], "ACHT"), new Card(9, "PIK", imgList[2], "NEUN"), new Card(10, "PIK", imgList[3], "ZEHN"), new Card(10, "PIK", imgList[4], "BUBE"), new Card(10, "PIK", imgList[5], "DAME"), new Card(10, "PIK", imgList[6], "KOENIG"), new Card(11, "PIK", imgList[7], "ASS"),
	new Card(7, "KARO", imgList[8], "SIEBEN"), new Card(8, "KARO", imgList[9], "ACHT"), new Card(9, "KARO", imgList[10], "NEUN"), new Card(10, "KARO", imgList[11], "ZEHN"), new Card(10, "KARO", imgList[12], "BUBE"), new Card(10, "KARO", imgList[13], "DAME"), new Card(10, "KARO", imgList[14], "KOENIG"), new Card(11, "KARO", imgList[15], "ASS"),
	new Card(7, "KREUZ", imgList[16], "SIEBEN"), new Card(8, "KREUZ", imgList[17], "ACHT"), new Card(9, "KREUZ", imgList[18], "NEUN"), new Card(10, "KREUZ", imgList[19], "ZEHN"), new Card(10, "KREUZ", imgList[20], "BUBE"), new Card(10, "KREUZ", imgList[21], "DAME"), new Card(10, "KREUZ", imgList[22], "KOENIG"), new Card(11, "KREUZ", imgList[23], "ASS"),
	new Card(7, "HERZ", imgList[24], "SIEBEN"), new Card(8, "HERZ", imgList[25], "ACHT"), new Card(9, "HERZ", imgList[26], "NEUN"), new Card(10, "HERZ", imgList[27], "ZEHN"), new Card(10, "HERZ", imgList[28], "BUBE"), new Card(10, "HERZ", imgList[29], "DAME"), new Card(10, "HERZ", imgList[30], "KOENIG"), new Card(11, "HERZ", imgList[31], "ASS")];

	this.cards = shuffle(this.cards);

	dealCards();

	this.player1 = new Player(this.player1Cards);
	this.playerList.push(this.player1);

	//wert = this.player1.berechneValue();

	//wert = createElement('h2', 'WERT: ' + this.player1.berechneValue());
	//wert.position(width/10, height/10+30);

	this.player2 = new Player(this.player2Cards);
	this.playerList.push(this.player2);

	resetCards1 = player1.cards;
	resetCards2 = middleCards;

	//hier sind die Button-Pressed Events
	btnSchieben.mousePressed(schieben);
	btnKlopfen.mousePressed(klopfen);
	//btnZug_beendet.mousePressed(zug_beendet);
	btnSwitchAllCards.mousePressed(switchAllCards);

	textSize(25);
	textStyle(BOLD);

	//Ausgabe auf der Browser Konsole (nur zur Uebersicht)
	console.log(this.cards);
	console.log(this.player1);
	//console.log(this.player2);
	console.log(this.middleCards);
	console.log(this.resetCards1);
	//console.log(this.playerList);
}

function dealCards() {
	for (var i = 2; i >= 0; i--) {
		this.player1Cards.push(this.cards[i]);
		this.cards.splice(i, 1);
	}
	for (var i = 2; i >= 0; i--) {
		this.player2Cards.push(this.cards[i]);
		this.cards.splice(i, 1);
	}
	for (var i = 2; i >= 0; i--) {
		this.middleCards.push(this.cards[i]);
		this.cards.splice(i, 1);
	}
}

/*function nextRound() {
	this.player2.
}*/

function schieben() {
	print("GESCHOBEN");
	player1.geschoben = true;
}

function klopfen() {
	print("GEKLOPFT");
	player1.geklopft = true;
}

function zug_beendet() {
	print("ZUG BEENDET");
	zugGemacht = true;
}

function switchAllCards() {
	if(switchedAllCards == false && zugGemacht == false) {
		var tmp = player1.cards;
		player1.cards = middleCards;
		middleCards = tmp;
		switchedAllCards = true;
	}
}

function mouseDragged() {
	var d1 = dist(mouseX, mouseY, this.player1.cards[0].pos1.x, this.player1.cards[0].pos1.y);
	var d2 = dist(mouseX, mouseY, this.player1.cards[1].pos2.x, this.player1.cards[1].pos2.y);
	var d3 = dist(mouseX, mouseY, this.player1.cards[2].pos3.x, this.player1.cards[2].pos3.y);
	switchCard(d1, d2, d3);
}

function switchCard(d1, d2, d3) {
	if(d1 < 30) {
		this.player1.cards[0].pos1 = new p5.Vector(mouseX, mouseY);
		var d1 = dist(mouseX, mouseY, this.middleCards[0].middlePos1.x, this.middleCards[0].middlePos1.y);
		var d2 = dist(mouseX, mouseY, this.middleCards[1].middlePos2.x, this.middleCards[1].middlePos2.y);
		var d3 = dist(mouseX, mouseY, this.middleCards[2].middlePos3.x, this.middleCards[2].middlePos3.y);
		var tmp = this.player1.cards[0];
		if(d1 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player1.cards[0] = this.middleCards[0];
			this.middleCards[0] = tmp;
			this.zugGemacht = true;
		} else if(d2 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player1.cards[0] = this.middleCards[1];
			this.middleCards[1] = tmp;
			this.zugGemacht = true;
		} else if(d3 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player1.cards[0] = this.middleCards[2];
			this.middleCards[2] = tmp;
			this.zugGemacht = true;
		}
	}
	else if(d2 < 30) {
		this.player1.cards[1].pos2 = new p5.Vector(mouseX, mouseY);
		var d1 = dist(mouseX, mouseY, this.middleCards[0].middlePos1.x, this.middleCards[0].middlePos1.y);
		var d2 = dist(mouseX, mouseY, this.middleCards[1].middlePos2.x, this.middleCards[1].middlePos2.y);
		var d3 = dist(mouseX, mouseY, this.middleCards[2].middlePos3.x, this.middleCards[2].middlePos3.y);
		var tmp = this.player1.cards[1];
		if(d1 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player1.cards[1] = this.middleCards[0];
			this.middleCards[0] = tmp;
			this.zugGemacht = true;
		} else if(d2 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player1.cards[1] = this.middleCards[1];
			this.middleCards[1] = tmp;
			this.zugGemacht = true;
		} else if(d3 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player1.cards[1] = this.middleCards[2];
			this.middleCards[2] = tmp;
			this.zugGemacht = true;
		}
	} 
	else if(d3 < 30) {
		this.player1.cards[2].pos3 = new p5.Vector(mouseX, mouseY);
		var d1 = dist(mouseX, mouseY, this.middleCards[0].middlePos1.x, this.middleCards[0].middlePos1.y);
		var d2 = dist(mouseX, mouseY, this.middleCards[1].middlePos2.x, this.middleCards[1].middlePos2.y);
		var d3 = dist(mouseX, mouseY, this.middleCards[2].middlePos3.x, this.middleCards[2].middlePos3.y);
		var tmp = this.player1.cards[2];
		if(d1 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player1.cards[2] = this.middleCards[0];
			this.middleCards[0] = tmp;
			zugGemacht = true;
		} else if(d2 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player1.cards[2] = this.middleCards[1];
			this.middleCards[1] = tmp;
			this.zugGemacht = true;
		} else if(d3 < 30 && this.zugGemacht == false && switchedAllCards == false) {
			this.player1.cards[2] = this.middleCards[2];
			this.middleCards[2] = tmp;
			this.zugGemacht = true;
		}
	}
}

function draw() {
	background(40, 100, 40);
	text("RUNDE: " + rundenCounter, 80, 70);
	text("LEBEN: " + this.player1.lives, 80, 100);
	text("WERT : " + this.player1.berechneValue(), 80, 130);
	/*
	if(zugGemacht || switchedAllCards) {
		background(40, 100, 40);
		wert = createElement('h2', 'WERT: ' + this.player1.berechneValue());
		wert.position(width/10, height/10+30);
	}

	if(false) {
		runde = createElement('h2', 'RUNDE: ' + this.rundenCounter);
		runde.position(width/10, height/10-30);

	}
	*/

	//show card deck on canvas
	for (var i = 0; i < this.cards.length; i++) {
		this.cards[i].showCardDeck(imgCardBack);
	}

	//show middle cards on canvas
	this.middleCards[0].showMiddleCard1();
	this.middleCards[1].showMiddleCard2();
	this.middleCards[2].showMiddleCard3();

	//show player1 cards on canvas
	this.player1.cards[0].showCard1();
	this.player1.cards[1].showCard2();
	this.player1.cards[2].showCard3();

	//show player2 cards on canvas
	this.player2.cards[0].showP2Card1(imgCardBack);
	this.player2.cards[1].showP2Card2(imgCardBack);
	this.player2.cards[2].showP2Card3(imgCardBack);
}