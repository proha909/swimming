var img;

function Card(value, symbol, img, name) {
	this.value = value;
	this.symbol = symbol;
	this.img = img;
	this.name = name;
	this.pos1 = new p5.Vector(width/2.2, height-100);
	this.pos2 = new p5.Vector(width/2.2+50, height-100);
	this.pos3 = new p5.Vector(width/2.2+100, height-100);

	this.middlePos1 = new p5.Vector(width/2-80, height/2);
	this.middlePos2 = new p5.Vector(width/2+20, height/2);
	this.middlePos3 = new p5.Vector(width/2+120, height/2);

	//show player1 cards
	this.showCard1 = function() {
		image(img, this.pos1.x, this.pos1.y, 90, 140);
	}

	this.showCard2 = function() {
		image(img, this.pos2.x, this.pos2.y, 90, 140); 
	}

	this.showCard3 = function() {
		image(img, this.pos3.x, this.pos3.y, 90, 140);
	}


	//show player2 cards
	this.showP2Card1 = function(imgCardBack) {
		translate(width/2, height/2);
		rotate(PI/2.0);
		image(imgCardBack, width/8, height/2.5, 60, 100);
	}

	this.showP2Card2 = function(imgCardBack) {
		image(imgCardBack, width/8-100, height/2.5, 60, 100);
	}

	this.showP2Card3 = function(imgCardBack) {
		image(imgCardBack, width/8-200, height/2.5, 60, 100);
	}


	//show middle cards
	this.showMiddleCard1 = function() {
		image(img, this.middlePos1.x, this.middlePos1.y, 70, 120);
	}

	this.showMiddleCard2 = function() {
		image(img, this.middlePos2.x, this.middlePos2.y, 70, 120);
	}

	this.showMiddleCard3 = function() {
		image(img, this.middlePos3.x, this.middlePos3.y, 70, 120);
	}


	//show card deck
	this.showCardDeck = function(imgCardBack) {
		image(imgCardBack, width/1.2, height/2, 80, 120);
	}
}
