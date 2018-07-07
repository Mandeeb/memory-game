// List of cards
 const suits = ["fa fa-diamond",
                "fa fa-diamond",
                "fa fa-paper-plane-o",
                "fa fa-paper-plane-o",
                "fa fa-anchor",
                "fa fa-anchor",
                "fa fa-bolt",
                "fa fa-bolt",
                "fa fa-cube",
                "fa fa-cube",
                "fa fa-leaf",
                "fa fa-leaf",
                "fa fa-bicycle",
                "fa fa-bicycle",
                "fa fa-bomb",
                "fa fa-bomb"];

//Variables
const cardContainer = document.querySelector('.deck');
const moveContainer = document.querySelector('.moves');
const starContainer = document.querySelector('.stars');
const star = '<li><i class="fa fa-star"></i></l>';
const timerDisplay = document.querySelector('.timer');
const restart = document.querySelector('.restart');

let countdown;
let moves = 0;
let flippedCards = [];
let matchedCards = [];


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
  }


// Create and display shuffled cards (I referred to https://www.youtube.com/watch?v=G8J13lmApkQ to get started. I was really struggling.)
  function start() {
    shuffle(suits);
    for(let i = 0; i < suits.length; i++) {
    const card = document.createElement('li');
    card.classList.add('card');
    card.innerHTML = `<i class="${suits[i]}"></i>`;
    cardContainer.appendChild(card);

    click(card);
    }
  }


// Flip cards
  function click(card) {
    card.addEventListener('click', function() {

    const secondCard = this;
    const firstCard = flippedCards[0];

    if(flippedCards.length === 1) {
      card.classList.add('show', 'open');
      flippedCards.push(this);

      // Compare cards
      if(secondCard.innerHTML === firstCard.innerHTML) {
        secondCard.classList.add('match');
        firstCard.classList.add('match');
        matchedCards.push(secondCard, firstCard);

        flippedCards = [];

        // Game over?
        gameOver();

      } else {
        setTimeout(function() {
        secondCard.classList.remove('show', 'open');
        firstCard.classList.remove('show', 'open');
        }, 500);

        flippedCards = [];
      }

  } else {
    card.classList.add('show', 'open');
    flippedCards.push(this);
  }

// Start timer
    if(moves === 0) {
      timer(240);
    }

  addMove();
  rating();

  });
  }


// Start game
  start();


// Number of stars for end of game message
  function finalStars() {
    if (moves <= 28) {
      x = 3;
    } else if (28 < moves <= 38) {
      x = 2;
    } else if (38 < moves < 48) {
      x = 1;
    } else {
      x = 0;
    }
  }


// Game over
  function gameOver() {


    if(matchedCards.length === suits.length) {
      setTimeout(function() {
        finalStars();
        console.log(x);
        let message = 'You won with ' + left + ' left! Your star rating is ' + x + '. Click ok to play again.';
        if (window.confirm(message)) {
          playAgain();
        }
      }, 500);
      clearInterval(countdown);
    }
  }


// Move counter
    function addMove() {
      moves++;
      moveContainer.innerHTML = moves;
    }


// Star rating
  starContainer.innerHTML = star + star + star;
  function rating() {
    if (moves <= 28) {
      starContainer.innerHTML = star + star + star;
    } else if (28 < moves <= 38) {
      starContainer.innerHTML = star + star;
    } else if (38 < moves < 48) {
      starContainer.innerHTML = star;
    } else {
      starContainer.innerHTML = [];
    }
  }


// Play again function
  function playAgain() {
    cardContainer.innerHTML = '';
    moveContainer.innerHTML = '';
    starContainer.innerHTML = star + star + star;
    timerDisplay.textContent = '4:00';

    start();

    matchedCards = [];

    moves = 0;
  }


// Restart game event listener
  restart.addEventListener('click', function() {
    cardContainer.innerHTML = '';
    moveContainer.innerHTML = '';
    starContainer.innerHTML = star + star + star;
    timerDisplay.textContent = '4:00';

    clearInterval(countdown);
    start();

    matchedCards = [];

    moves = 0;
  });


  //Timer function from https://www.youtube.com/watch?v=LAaf7-WuJJQ
    function timer(seconds) {
        const now = Date.now();
        const then = now + seconds * 1000;
        displayTimeLeft(seconds);

        countdown = setInterval(() => {
          const secondsLeft = Math.round((then - Date.now()) / 1000);

          if(secondsLeft <= 0) {
            clearInterval(countdown);
            return;
          }

          displayTimeLeft(secondsLeft);
        }, 1000);
    }

    function displayTimeLeft(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainderSeconds = seconds % 60;
      const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
      timerDisplay.textContent = display;
      left = display;
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

 /* display cards symbol when clicked */
