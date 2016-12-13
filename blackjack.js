// GLOBALS
var theDeck = [];



//First line tells JS to wait for the DOM 
$(document).ready(function(){

	$('.deal-button').click(function(){
		console.log(this);
		createDeck();
		shuffleDeck();
	});

	$('.hit-button').click(function(){
		console.log(this);
	});

	$('.stand-button').click(function(){
		console.log(this);
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





























