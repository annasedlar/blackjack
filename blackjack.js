//GLOBALS
const freshDeck = createDeck();
theDeck = freshDeck;
var playersHand = []; //players1Squares in tictactoe
var dealersHand = []; //players2Squares in tictactoe
var topOfDeck = 4;

$(document).ready(function(){

	$('.deal-button').click(function(){
		//shuffle deck
		shuffleDeck();
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());

		placeCard('player', 1, playersHand[0]);
		placeCard('dealer', 1, dealersHand[0]);
		placeCard('player', 2, playersHand[1]);
		placeCard('dealer', 2, dealersHand[1]);
		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');
		$('.message').text('Hit or Stand?');
	})

	$('.hit-button').click(function(){
		if(calculateTotal(playersHand, 'player') < 21){
			playersHand.push(theDeck.shift());  //will always place the topcard in deck into players hand
			var slotForNewCard = playersHand.length;
			// var playerTotal = calculateTotal(playersHand, 'player');
			var lastCardIndex = playersHand.length - 1;
			placeCard('player', slotForNewCard, playersHand[lastCardIndex]);
			calculateTotal(playersHand, 'player');
			checkWin();
		}
	})


	$('.stand-button').click(function(){
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
			while(dealerTotal < 17){
				dealersHand.push(theDeck.shift());
				var slotForNewCard = dealersHand.length;
				var lastCardIndex = (dealersHand.length - 1);
				placeCard('dealer', slotForNewCard, dealersHand[lastCardIndex]);
				calculateTotal(dealersHand, 'dealer');
				dealertotal = calculateTotal(dealersHand, 'dealer'); 
			}	
		checkWin();
	})
});

function checkWin(){
	playerTotal = calculateTotal(playersHand, 'player');
	dealerTotal = calculateTotal(dealersHand, 'dealer');
	winner = "";

	if(playerTotal > 21){
		$('.message').text('BUST! Dealer Wins');
		$('.deal-button stand-button deal-button').addClass('.disabled');
	}else if(dealerTotal > 21){
		//dealer busted, game over, player wins, put msg in DOM
		$('.message').text('DEALER BUST! YOU WIN!');
	}else {
		if(playerTotal > dealerTotal){
			//player one, say in DOM
			$('.message').text('You win!');
			winner = "player";
		}else if(dealerTotal > playerTotal){
			//dealer won. Dom.
			winner = "Dealer";
			$('.message').text(winner + ' Wins');
		}else{
			winner = "tie";
			//say in the Dom
			$('.message').text('TIE!');
		}
	} // no one busted, see who's higher
}

function reset(){
	theDeck = freshDeck; //make a copy of our constant freshDeck
	// the deck needs to be reset
	playersHand = [];
	dealersHand = [];
	$('.card').html('');
	playerTotal = calculateTotal(playersHand, 'player');
	dealerTotal = calculateTotal(dealersHand, 'dealer');
}

function createDeck(){
	var newDeck=[];
	var suits = ['h', 's', 'd', 'c'];
		//suits/outer loop
	for(let s = 0; s < suits.length; s ++){ 
			//card value/inner loop
		for(let c = 1; c <=13; c ++){ 
				//update theDeck and .push onto theDeck every card
			newDeck.push(c+suits[s]);
		}
	}
	return newDeck; 
}

function shuffleDeck(){
	for(var i = 0; i < 1000; i++){
		randomCard1 = Math.floor(Math.random() * theDeck.length);
		randomCard2 = Math.floor(Math.random() * theDeck.length);

		var temp = theDeck[randomCard1];
		theDeck[randomCard1] = theDeck[randomCard2];
		theDeck[randomCard2] = temp;
	}
	return(theDeck);
}

function placeCard(who, where, whatCard){
	var classSelector = '.' + who + '-cards .card-' + where;
	$(classSelector).html('<img src="cards/' + whatCard + '.png">');
}

function calculateTotal(hand, who){
	var total = 0;
	var cardValue = 0;
	var hasAce = false;
	for(let i=0; i < hand.length; i++){
		cardValue = Number(hand[i].slice(0, -1));
		if(cardValue > 10){ //compensating for face cards --all equal ten
			cardValue = 10;
		}

		total += cardValue;
	}
		//update the dom with the new total 
	var classSelector = '.'+who + '-total-number';
	$(classSelector).text(total);
	return(total);
}







