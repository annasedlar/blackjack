$(document).ready(function(){
//GLOBALS
	var theDeck = createDeck();
	var playersHand = []; //players1Squares in tictactoe
	var dealersHand = []; //players2Squares in tictactoe

	$('button').hover(function(){
		$(this).addClass("hover")
	}, function(){
		$(this).removeClass("hover")
	})

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
		// $('.hit-button').css("visibility": "visible");
		// $('.stand-button').css("visiblilty": "visible");
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
		}else{$('.deal-button stand-button hit-button').prop('disabled', true);
		}
	})

	$('.stand-button').click(function(){
		var dealerTotal = calculateTotal(dealersHand, 'dealer');  //I DON'T KNOW WHY IT WOULDN'T WORK UNLESS I COMMENTED THISOUT (WAS ERRORING CAN'T FIND .LENGTH OF UNDEFINED IN CALCULATETOTAL FUNCTION)
			while(dealerTotal < 17){
				dealersHand.push(theDeck.shift());
				var slotForNewCard = dealersHand.length;
				var lastCardIndex = (dealersHand.length - 1);
				placeCard('dealer', slotForNewCard, dealersHand[lastCardIndex]);
				dealerTotal = calculateTotal(dealersHand, 'dealer');
			}	
			checkWin();
	})

function checkWin(){
	var playerTotal = calculateTotal(playersHand, 'player');
	var dealerTotal = calculateTotal(dealersHand, 'dealer');

	if(playerTotal > 21){
		$('.message').text('BUST! Dealer Wins').addClass('end-message');
		$('.deal-button stand-button hit-button').prop('disabled', true);
		$('.reset').fadeIn("slow");
		$('.reset-button').click(function(){
			reset();})
	}else if(dealerTotal > 21){
		//dealer busted, game over, player wins, put msg in DOM
		$('.message').text('DEALER BUST! YOU WIN!').addClass('end-message');
		$('.deal-button stand-button hit-button').prop('disabled', true);
		$('.reset').fadeIn("slow");
		$('.reset-button').click(function(){
			reset();})
	}else {
		if(playerTotal > dealerTotal){
			//player one, say in DOM
			$('.message').text('You win!').addClass('end-message');
			$('.deal-button stand-button hit-button').prop('disabled', true);
		}else if(dealerTotal > playerTotal){
			//dealer won. Dom.
			$('.message').text(winner + ' Wins').addClass('end-message');
			$('.deal-button stand-button hit-button').prop('disabled', true);
		}else{
			//say in the Dom
			$('.message').text('TIE!').addClass('end-message');
			$('.deal-button stand-button hit-button').prop('disabled', true);
		}
		$('.reset').fadeIn("slow");
		$('.reset-button').click(function(){
		reset();})
	} // no one busted, see who's higher
}


function reset(){
	theDeck = createDeck(); //make a copy of our constant freshDeck
	// the deck needs to be reset
	playersHand = [];
	dealersHand = [];
	$('.card').html('');
	var playerTotal = calculateTotal(playersHand, 'player');
	var dealerTotal = calculateTotal(dealersHand, 'dealer');
	$('.message').text('').removeClass('end-message');
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
		var randomCard1 = Math.floor(Math.random() * theDeck.length);
		var randomCard2 = Math.floor(Math.random() * theDeck.length);

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
	var totalAces = 0;
	for(let i=0; i < hand.length; i++){
		cardValue = Number(hand[i].slice(0, -1));
		if(cardValue == 1){ 
			hasAce = true;
			cardValue = 11;
			totalAces ++;
		}else if(cardValue > 10){
			cardValue = 10;
		}
		total += cardValue;
	}
	for(let i=0; i < totalAces; i++){
		if(total > 21){
			total -=1;
		}
	}

		//update the dom with the new total 
	var classSelector = '.'+who + '-total-number';
	$(classSelector).text(total);
	return(total);
}

// function checkAces(){	
// 	if(total > 12){
// 		any aces = 1 point
// 	}else {
// 		any ace <= 11 points
// 	}

// }
});




