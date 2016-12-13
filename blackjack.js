// GLOBALS
var theDeck = [];
createDeck();
var playersHand = [];
var dealersHand = [];



//First line tells JS to wait for the DOM 
$(document).ready(function(){

	$('.deal-button').click(function(){
		shuffleDeck();
		//add card 0 to players hand (ie. the first card in our deck array which is shuffled
		// ie - we dk what card it is)
		playersHand.push(theDeck[0]);
		dealersHand.push(theDeck[1]);
		playersHand.push(theDeck[2]);
		dealersHand.push(theDeck[3]);
		
		//put the first card in the players hand
		placeCard(playersHand[0], "player", 'one');
		placeCard(playersHand[1], "player", 'two');
		placeCard(dealersHand[0], "dealer", 'one');
		placeCard(dealersHand[1], "dealer", 'two');

		calculateTotal('player', playersHand);
		calculateTotal('dealer', dealersHand);
	});

	$('.hit-button').click(function(){
	});

	$('.stand-button').click(function(){
	});
});


function createDeck(){
	var suits = ['h', 's', 'd', 'c'];
	for(let s = 0; s < suits.length; s++){
		for(let c=1; c <=13; c++){
			theDeck.push(c+suits[s]);
		}
	}
}

function shuffleDeck(){
	for(let i=0; i<5000; i++){
		var card1ToSwitch = Math.floor(Math.random() * theDeck.length)
		var card2ToSwitch = Math.floor(Math.random() * theDeck.length)
		var temp = theDeck[card1ToSwitch];
		theDeck[card1ToSwitch] = theDeck[card2ToSwitch]
		theDeck[card2ToSwitch] = temp;
	}
}

function placeCard(whatCard, who, whichSlot){
	var classToTarget = '.'+who+'-cards .card-'+whichSlot;
	console.log(classToTarget);
	$(classToTarget).html('<img src="cards/' +whatCard+'.png">');
};


function calculateTotal(who, hand){
	var cardValue = 0;
	var total=0;
	for(let i=0; i < hand.length; i++){
		cardValue = Number(hand[i].slice(0, -1));
		console.log(cardValue); 
		total += cardValue
	}

	var classToTarget = '.'+who+'-total-number';
	$(classToTarget).text(total);
}
























