/*
 * Create a list that holds all of your cards
 */

 cardList = ['fa fa-diamond', 'fa fa-diamond',
             'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
             'fa fa-anchor', 'fa fa-anchor',
             'fa fa-bolt', 'fa fa-bolt',
             'fa fa-cube', 'fa fa-cube',
             'fa fa-leaf', 'fa fa-leaf',
             'fa fa-bicycle', 'fa fa-bicycle',
             'fa fa-bomb', 'fa fa-bomb'
           ]

 const allCards = document.querySelectorAll('.card');
 const shuffleButton = document.querySelector('.restart');
 // const replayButton = document.querySelector('.modal-buttons');
 let openCards = []; //store open cards here
 let matchedCards = []; //store matched cards here
 let moveCounter = 0; // start moves at 0
 // let clockKeeper; // initialize clockKeeper


 function replayGame() {
   matchedCards = []; // restart matchedCards list so game knows when you have won
   // toggleModalOff(); // turn off modal
   // clearInterval(clockKeeper); // reset clock for new game
   // document.querySelector('.clock').innerHTML = '0:00'
   newList = shuffle(cardList); // shuffle cardList
   document.querySelector('.moves').innerHTML = 0; // reset moves to 0
   moveCounter = 0;
   i = 0;
   for (const card of allCards) {
     card.classList.remove('open', 'show', 'match'); // reset CSS so all cards are face down
     card.querySelector('i').className = newList[i]; // change html to new shuffled list of cards
     i += 1;
   }
 }

 // clicking the restart button restarts the game
 shuffleButton.addEventListener('click', function () {
   replayGame();
 });

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 // flip cards to show symbol
 function showSymbol(card) {
   card.classList.add('open', 'show');
 }

 // change card to empty symbol
 function removeSymbol(card) {
   card.classList.remove('open', 'show')
 }

 // change card to match class
 function matchSymbol(card) {
   card.classList.add('match');
 }

 // store cards in openCards list
 function appendCardList (card) {
   openCards.push(card);
 }


 // main click event flips cards and matches correct ones
 for (const card of allCards) {
   card.addEventListener('click', function () {
     if (!card.classList.contains('open', 'show') && (openCards.length < 2)) {
       moveCounter += 1;
       document.querySelector('.moves').innerHTML = moveCounter;
       showSymbol(card);
       appendCardList(card);
       if (openCards.length < 2) {}
       else if (openCards.length = 1) {
         appendCardList(card);
         const firstCard = openCards[0].querySelector('i').className;
         const secondCard = card.querySelector('i').className;
         if (firstCard === secondCard) {
           for (const card of openCards) {
             matchSymbol(card);
             matchedCards.push(card);
           }
           openCards = [];
           if (matchedCards.length === 16) {
             // clearInterval(clockKeeper);
             // toggleModalOn();
             // addStats();
           }
         }
         else {
           setTimeout(function() {
             for (const card of openCards) {
               removeSymbol(card);
             }
             openCards = [];
           }, 1200)
         }
       }
     }
     // subtractStars(moveCounter);
   })
 }
