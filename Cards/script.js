// Dave Mendoza

/*
Using code from the previous Playing Cards activity:
1. Implement a "Deal Card" button where it pops a card from the deck and shows its name and symbol. This button must disable according to the cards 
2. left in the deck.
3. Implement a "Remaining Cards" view where it should see the number of remaining cards in the deck
4. Implement a "Draw History" function where you can see the history of the cards dealt
5. Implement "Previous" and "Next" buttons. That will show the past cards dealt. These buttons must enabled according to the draw history's length
6. Implement a "Reshuffle Deck" button that would reshuffle the deck and reset the history.
The design and representation and responsiveness of the cards in the DOM is up to your creativity and imagination. 
You may use array built-in methods.
Bonus
After a shuffle, loop your deck by dealing five cards until the deck is exhausted. On each deal, print what kind of poker hand is dealt! https://en.wikipedia.org/wiki/List_of_poker_hands
*/
const deckBar = document.getElementsByClassName("deck");
const handBar = document.getElementsByClassName("cards-list");
const currentHand = document.getElementsByClassName("hand");
const view = document.getElementsByClassName("view");
const SUITS = ['♠','♥','♦','♣'];
const RANK = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
var deck = [];
var hand = [];
var ptr = 0;


function create(){
  document.getElementById("dealcard").disabled = false;
    for(let i = 0; i < SUITS.length; i++){
	    for(let j = 0; j < RANK.length; j++)
            deck.push(RANK[j] + SUITS[i]);
        }
        deck = shuffle(deck);
deckBar[0].innerHTML= deckToString(deck);
}
function shuffle(){
	let shuffled = [];
  while(deck.length > 0){
  	let r = Math.floor(Math.random() * deck.length);
  	shuffled.push(deck[r]);
    deck.splice(r,1);
  }
  deck = shuffled;
  deckBar[0].innerHTML = deckToString(deck);
    return shuffled;
}

function arrangeBySuit(){
	let res = [];
	const spades = deck.filter(cards => cards.indexOf('♠') != -1);
  const hearts = deck.filter(cards => cards.indexOf('♥') != -1);
  const clubs = deck.filter(cards => cards.indexOf('♣') != -1);
  const diamonds = deck.filter(cards => cards.indexOf('♦') != -1);
  for(let i = 0; i < spades.length; i++){
  	res.push(spades[i]);
  }
  for(let i = 0; i < hearts.length; i++){
  	res.push(hearts[i]);
  }
  for(let i = 0; i < clubs.length; i++){
  	res.push(clubs[i]);
  }
  for(let i = 0; i < diamonds.length; i++){
  	res.push(diamonds[i]);
  }
  deck = res;
  deckBar[0].innerHTML = deckToString(deck);

  return res;
}
function arrangeByRank(){
	let res = [];
	const ace = deck.filter(cards => cards.indexOf('A') != -1);
  const two = deck.filter(cards => cards.indexOf('2') != -1);
  const three = deck.filter(cards => cards.indexOf('3') != -1);
  const four = deck.filter(cards => cards.indexOf('4') != -1);
  const five = deck.filter(cards => cards.indexOf('5') != -1);
  const six = deck.filter(cards => cards.indexOf('6') != -1);
  const seven = deck.filter(cards => cards.indexOf('7') != -1);
  const eight = deck.filter(cards => cards.indexOf('8') != -1);
  const nine = deck.filter(cards => cards.indexOf('9') != -1);
  const ten = deck.filter(cards => cards.indexOf('10') != -1);
  const jack = deck.filter(cards => cards.indexOf('J') != -1);
  const queen = deck.filter(cards => cards.indexOf('Q') != -1);
  const king = deck.filter(cards => cards.indexOf('K') != -1);
  for(let i = 0; i < ace.length; i++){
  	res.push(ace[i]);
  }
  for(let i = 0; i < two.length; i++){
  	res.push(two[i]);
  }
  for(let i = 0; i < three.length; i++){
  	res.push(three[i]);
  }
  for(let i = 0; i < four.length; i++){
  	res.push(four[i]);
  }
  for(let i = 0; i < five.length; i++){
  	res.push(five[i]);
  }
  for(let i = 0; i < six.length; i++){
  	res.push(six[i]);
  }
  for(let i = 0; i < seven.length; i++){
  	res.push(seven[i]);
  }
  for(let i = 0; i < eight.length; i++){
  	res.push(eight[i]);
  }
  for(let i = 0; i < nine.length; i++){
  	res.push(nine[i]);
  }
  for(let i = 0; i < ten.length; i++){
  	res.push(ten[i]);
  }
  for(let i = 0; i < jack.length; i++){
  	res.push(jack[i]);
  }
  for(let i = 0; i < queen.length; i++){
  	res.push(queen[i]);
  }
  for(let i = 0; i < king.length; i++){
  	res.push(king[i]);
  }
  deck = res;
  deckBar[0].innerHTML = deckToString(deck);

  return res;
  
}
function dealCard(){
	let r = Math.floor(Math.random() * deck.length);

  let suit, rank;
  switch(deck[r][0]){
  	case 'A':
    	rank = 'Ace';
      break;
    case '2':
    	rank = 'Two';
      break;
    case '3':
    	rank = 'Three';
      break;
    case '4':
    	rank = 'Four';
      break;
     case '5':
    	rank = 'Five';
      break;
    case '6':
    	rank = 'Six';
      break;
    case '7':
    	rank = 'Seven';
      break;
    case '8':
    	rank = 'Eight';
      break;
    case '9':
    	rank = 'Nine';
      break;
    case '1':
    	rank = 'Ten';
      break;
    case 'J':
    	rank = 'Jack';
      break;
    case 'Q':
    	rank = 'Queen';
      break;
    case 'K':
    	rank = 'King';
      break;
  }
  switch(deck[r][deck[r].length-1]){
  	case '♠':
    	suit = 'Spades';
      break;
    case '♥':
    	suit = 'Hearts';
      break;
    case '♦':
    	suit = 'Diamonds';
      break;
    case '♣':
    	suit = 'Clubs';
      break;
  
  }
  currentHand[0].innerHTML = deck[r] + " (" +rank + " of " + suit + ")" ;
  
  hand.push(deck.splice(r,1));
  deckBar[0].innerHTML = deckToString(deck);
  handBar[0].innerHTML = deckToString(hand);
  if (deck.length == 0){
    document.getElementById("dealcard").disabled = true;
  }
  ptr = hand.length - 1;
  if (ptr >= 1) document.getElementById("back").disabled = false;
  view[0].innerHTML = hand[ptr];
  return (rank + " of " + suit);
}

function next(){
  ptr = ptr + 1;
  view[0].innerHTML = hand[ptr];
  if(ptr == hand.length - 1) document.getElementById("next").disabled = true;
  document.getElementById("back").disabled = false;
}
function back(){
  document.getElementById("next").disabled = false;
  ptr = ptr - 1;
  view[0].innerHTML = hand[ptr];
  if(ptr == 0) document.getElementById("back").disabled = true;
}
/*while (deck.length > 0){
console.log(dealCard(deck));
}*/
function deckToString(deck){
    let res = '';
    for (let i = 0; i < deck.length; i++){
        res = res + deck[i] + ', ';
    }

    return res;
}
function clearDeck(){
  deck = [];
  hand = [];
  deckBar[0].innerHTML = deckToString(deck);
  handBar[0].innerHTML = deckToString(hand);
  currentHand[0].innerHTML = '';
  document.getElementById("dealcard").disabled = true;
  document.getElementById("back").disabled = true;
  document.getElementById("next").disabled = false;

}
function reshuffle(){
  clearDeck();
  create();
}

