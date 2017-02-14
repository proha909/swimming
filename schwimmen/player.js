var cards;
var points = 0;

var playerCount = 0;

function Player(cards) {
	this.cards = cards;
	this.points = points;

	this.berechneValue = function() {

		if(this.cards[0].name == "ASS" && this.cards[1].name == "ASS" && this.cards[2].name == "ASS") {
			this.points = 33;
		} else if(this.cards[0].name == this.cards[1].name &&  this.cards[1].name == this.cards[2].name && this.cards[2].name == this.cards[0].name) {
			this.points = 30.5;
		} else if(this.cards[0].symbol == this.cards[1].symbol &&  this.cards[1].symbol == this.cards[2].symbol && this.cards[2].symbol == this.cards[0].symbol) {
			this.points = this.cards[0].value + this.cards[1].value + this.cards[2].value;
		} else if(this.cards[0].symbol == this.cards[1].symbol) {
			this.points = this.cards[0].value + this.cards[1].value;
		} else if(this.cards[0].symbol == this.cards[2].symbol) {
			this.points = this.cards[0].value + this.cards[2].value;
		} else if(this.cards[1].symbol == this.cards[2].symbol) {
			this.points = this.cards[1].value + this.cards[2].value;
		} else {
			if(this.cards[0].value >= this.cards[1].value && this.cards[0].value >= this.cards[2].value) {
				this.points = this.cards[0].value;
			} else if(this.cards[1].value >= this.cards[0].value && this.cards[1].value >= this.cards[2].value) {
				this.points = this.cards[1].value;
			} else if(this.cards[2].value >= this.cards[0].value && this.cards[2].value >= this.cards[1].value) {
				this.points = this.cards[2].value;
			}
		}
		return this.points;
	}

	playerCount++;
	imageMode(CENTER);
}