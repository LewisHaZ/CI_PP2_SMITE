/**
 * Array to hold the images for the cards
 */
const deckOfCards = ["ah-puch.png", "ah-puch.png", "anhur.png", "anhur.png",
 "fenrir.png", "fenrir.png", "hercules.png", "hercules.png", "kali.png", 
 "kali.png", "medusa.png", "medusa.png", "mercury.png", "mercury.png", "ra.png",
  "ra.png"];

  const cards = document.querySelector('.cards');
  let turned = [];
  let matched = [];
  const modal = document.getElementById('modal');
  const reset = document.querySelector('.reset-btn');
  const playAgain = document.querySelector('.play-again-btn');
  const turnsCount = document.querySelector('.turns-counter');

  let turns = 0;

  const crown = document.getElementById('rating').querySelectorAll('.crown');

  let ratingCount = 3;

  const timeCounter = document.querySelector('.timer');

  let time = 0;
  let minutes = 0;
  let seconds = 0;
  let timeStart = false;

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

  function startGame(){
    const shuffledDeck = shuffle(deckOfCards);
    for(let i = 0; i < shuffledDeck.length; i++){
        const liTag = document.createElement('LI');
        liTag.classList.add('card');
        const addImage = document.createElement('IMG');
        liTag.appendChild(addImage);
        addImage.setAttribute('src', 'https://github.com/LewisHaZ/CI_PP2_SMITE/tree/main/assets/images' + shuffledDeck[i]);
        addImage.setAttribute('alt', 'image of king arthur from smite');
        cards.appendChild(liTag);
    }
  }

  startGame();

  function removeCard(){
    while (cards.hasChildNodes()){
        cards.removeChild(cards.firstChild);
    }
  }
  function timer(){
    time = setInterval(function(){
        seconds++;
        if(seconds === 60){
            minutes ++;
            seconds = 0;
        }
        timeCounter.innerHTML = '<i class="fa-solid fa-hourglass-half"></i>' + 
        'Time elapsed: ' + minutes + ' Mins' + seconds + ' Secs';
    }, 1000);
  }

  function stopTime(){
    clearInterval(time);
  }
  function resetEverything(){
    stopTime();
    timeStart = false;
    seconds = 0;
    minutes = 0;
    timeCounter.innerHTML = '<i class="fa-solid fa-hourglass-half"></i>' + 
    'Time elapsed: 00:00';
  

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

  function turnsCounter(){
    turnsCount.innerHTML ++;
    turns ++;
  }

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

  function compareTurnedCards(){
    if(turned.length === 2){
        document.body.style.pointerEvents = 'none';
    }

    if(turned.length === 2 && turned[0].src != turned[1].src){
        match();
    } else if (turned.length === 2 && turned[0].src != turned[1].src){
        noMatch();
    }
  }

  function match(){
    setTimeout(function(){
        turned[0].parentElement.classList.add("match");
        turned[1].parentElement.classList.add("match");
        match.push(...turned);
        document.body.style.pointerEvents = 'auto';
        winGame();
        turned = [];
    }, 600);
    turnsCounter();
    crownRating();
  }

  function noMatch(){
    setTimeout(function(){
        turned[0].parentElement.classList.remove("flip");
        turned[1].parentElement.classList.remove("flip");
        document.body.style.pointerEvents = 'auto';
        turned = [];
    }, 700);
    turnsCounter();
    crownRating();
}

function AddStats(){
    const stats = document.querySelector('.modal-content');
    for(let i = 1; i<= 3; i++){
        const statsElement = document.createElement('p');
        statsElement.classList.add('stats');
        stats.appendChild(statsElement);
    }

    let p = stats.querySelectorAll('p.stats');
    p[0].innerHTML = 'Time to complete: ' + minutes + "Minutes and" + seconds + " seconds";
    p[1].innerHTML = 'Turns taken: ' + turns;
    p[2].innerHTML = 'Your Crown Rating is: ' + ratingCount + 'out of 3';
}

function displayModal(){
    const modalClose = document.getElementsByClassName('close')[0];
    modal.style.display = 'block';
    modalClose.onclick = function(){
        modal.style.display = 'none';
    };
    window.onclick = function(event){
        if(event.target === modal){
            modal.style.display = 'none';
        }
    };
}

function winGame(){
    if(matched.length === 16){
        stopTime();
        AddStats();
        displayModal();
    }
}

cards.addEventListener('click', function(evt){
    if(evt.target.nodeName === 'LI'){
        console.log(evt.target.nodeName + 'was clicked');

        if(timeStart === false){
            timeStart = true;
            timer();
        }
        flipCard();
    }
    function flipCard(){
        evt.target.classList.add('flip');
        addToTurned();
    }
    function addToTurned(){
        if(turned.length === 0 || turned.length === 1){
            turned.push(evt.target.firstElementChild);
        }
        compareTurnedCards();
    }
});

reset.addEventListener('click', resetEverything);
playAgain.addEventListener('click', function(){
    modal.style.display = 'none';
    resetEverything();
});

    