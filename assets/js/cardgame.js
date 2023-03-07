/**
 * Array to hold the images for the cards
 */
const deckOfCards = ["ah-puch.png", "ah-puch.png", "anhur.png", "anhur.png",
 "fenrir.png", "fenrir.png", "hercules.png", "hercules.png", "kali.png", 
 "kali.png", "medusa.png", "medusa.png", "mercury.png", "mercury.png", "ra.png",
  "ra.png"];

  // Access the ul class 'cards'
  const cards = document.querySelector(".cards");
  // Create empty array to store the 'turned' cards
  let turned = [];
  // Create empty array to store the 'matched' cards
  let matched = [];
  // Access the modal (popup window)
  const modal = document.getElementById("modal");
  // Get the reset button
  const reset = document.querySelector(".reset-btn");
  // Access the play again button
  const playAgain = document.querySelector(".play-again-btn");
  // Get the turns counter class
  const turnsCount = document.querySelector(".turns-count");

  // Create variable for turns counter, start it at zero
  let turns = 0;

  // Get the rating id and the crown class
  const crown = document.getElementById("rating").querySelectorAll(".crown");
  // set the default rating count to 3
  let ratingCount = 3;
  // Timer class
  const timeCounter = document.querySelector(".timer");
  // Set time to zero
  let time = 0;
  let minutes = 0;
  let seconds = 0;
  let timeStart = false;

  // Shuffle the cards into a random order on the game board
  function shuffle(array){
    let currentIndex = array.length, temporaryValue, randomIndex;

    while(currentIndex !== 0){

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // Start game function
  function startGame(){
    const shuffledDeck = shuffle(deckOfCards);
    // Assigning each image to a card slot, twice for each image
    for(let i = 0; i < shuffledDeck.length; i++){
        const liTag = document.createElement('LI');
        liTag.classList.add('card');
        const addImage = document.createElement("IMG");
        liTag.appendChild(addImage);
        addImage.setAttribute("src",  "https://lewishaz.github.io/CI_PP2_SMITE/assets/images/" + shuffledDeck[i]);
        addImage.setAttribute("alt", "image of king arthur from smite");
        cards.appendChild(liTag);
    }
  }
  // Start the game
  startGame();

  // Remove card function 
  function removeCard(){
    while (cards.hasChildNodes()){
        cards.removeChild(cards.firstChild);
    }
  }
  // Timer function 
  function timer(){
    time = setInterval(function(){
        // Increment the seconds by 1
        seconds++;
        if(seconds === 60){
            // Increment the minutes by 1 every 60 seconds
            minutes ++;
            seconds = 0;
        }
        timeCounter.innerHTML = "<i class='fa-solid fa-hourglass-half'></i>" + 
        "Time elapsed: " + minutes + " Mins" + seconds + " Secs";
    }, 1000);
  }

  // Stop timer function when user has finished game
  function stopTime(){
    clearInterval(time);
  }
  // Reset the board to their default stats
  function resetEverything(){
    stopTime();
    timeStart = false;
    seconds = 0;
    minutes = 0;
    timeCounter.innerHTML = "<i class='fa-solid fa-hourglass-half'></i>" + 
    "Time elapsed: 00:00";
    crown[1].firstElementChild.classList.add("fa-crown");
    crown[2].firstElementChild.classList.add("fa-crown");
    ratingCount = 3;
    turns = 0;
    turnsCount.innerHTML = 0;
     turned = [];
    matched = [];
    removeCard();
    startGame();
  }

  // For every two cards turned, increment turns count by 1 
  function turnsCounter(){
    turnsCount.innerHTML ++;
    turns ++;
  }

  // If the user goes over 14 turns, remove a crown
  // If the user goes over 19 turns, remove another crown
  function crownRating(){
    if(turns === 15){
        crown[2].firstElementChild.classList.remove("fa-crown");
        ratingCount--;
    }
    if(turns === 20){
        crown[1].firstElementChild.classList.remove("fa-crown");
        ratingCount--;
    }
  }

  // Comparing two cards function
  function compareTurnedCards(){
    if(turned.length === 2){
        // Disable extra click events when two cards are turned
        document.body.style.pointerEvents = "none";
    }
    // Matched cards if statement
    if(turned.length === 2 && turned[0].src === turned[1].src){
        match();
    // Non-matched cards
    } else if (turned.length === 2 && turned[0].src != turned[1].src){
        noMatch();
    }
  }

  // If match function
  function match(){
    setTimeout(function(){
        turned[0].parentElement.classList.add("match");
        turned[1].parentElement.classList.add("match");
        matched.push(...turned);
        document.body.style.pointerEvents = "auto";
        winGame();
        turned = [];
    }, 600);
    turnsCounter();
    crownRating();
  }

  // If no match function
  function noMatch(){
    setTimeout(function(){
        turned[0].parentElement.classList.remove("flip");
        turned[1].parentElement.classList.remove("flip");
        document.body.style.pointerEvents = "auto";
        turned = [];
    }, 700);
    turnsCounter();
    crownRating();
}

// Displaying the end game statistics to a modal
function AddStats(){
    const stats = document.querySelector(".modal-content");
    for(let i = 1; i <= 3; i++){
        const statsElement = document.createElement("p");
        statsElement.classList.add("stats");
        stats.appendChild(statsElement);
    }

    let p = stats.querySelectorAll("p.stats");
    p[0].innerHTML = "Time to complete: " + minutes + "Minutes and" + seconds + " seconds";
    p[1].innerHTML = "Turns taken: " + turns;
    p[2].innerHTML = "Your Crown Rating is: " + ratingCount + "out of 3";
}

// Calls the modal to be displayed 
function displayModal(){
    const modalClose = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    modalClose.onclick = function(){
        modal.style.display = "none";
    };
    window.onclick = function(event){
        if(event.target === modal){
            modal.style.display = "none";
        }
    };
}

// Ends the game when all cards are matched
function winGame(){
    if(matched.length === 16){
        stopTime();
        AddStats();
        displayModal();
    }
}

// Checks for cards turned and starts timer
cards.addEventListener("click", function(evt){
    if(evt.target.nodeName === "LI"){
        console.log(evt.target.nodeName + 'was clicked');

        if(timeStart === false){
            timeStart = true;
            timer();
        }
        flipCard();
    }
    // stores the first card flip in a function
    function flipCard(){
        evt.target.classList.add("flip");
        addToTurned();
    }
    // stores the second card flip and compares to first
    function addToTurned(){
        if(turned.length === 0 || turned.length === 1){
            turned.push(evt.target.firstElementChild);
        }
        compareTurnedCards();
    }
});

// Listener for play again button click event
reset.addEventListener('click', resetEverything);
playAgain.addEventListener('click',function(){
    modal.style.display = "none";
    resetEverything();
});

    