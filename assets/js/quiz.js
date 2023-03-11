// API for quiz content
// https://opentdb.com/api.php?amount=10&category=20

// Variables to be used for each feature
const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-questions');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');
let correctAnswer = "";
let totalQuestion = 5;
let correctScore = 0;
let askedCount = 0;

//event listeners
function eventListeners(){
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgainBtn.addEventListener('click', restartQuiz);
}

// Loads the DOM
document.addEventListener('DOMContentLoaded', () =>{
    loadQuestion();
    eventListeners();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
});

// Brings in the API for the questions using fetch
async function loadQuestion(){
    const APIUrl = 'https://opentdb.com/api.php?amount=10&category=20';
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    _result.innerHTML = "";
    showQuestion(data.results[0]);
}

// load the questions and their options
function showQuestion(data){
    _checkBtn.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    // inserting correct answer in a random position in the options list
    optionsList.splice(Math.floor(Math.random() * 
    (incorrectAnswer.length + 1)) , 0, correctAnswer); 

    _question.innerHTML = `${data.question} <br> <span class ="category">${data.category}</span>`;
    _options.innerHTML = `${optionsList.map((option, index) => `
        <li>  ${index + 1}. <span> ${option} </span> </li>
        `).join('')}
        `;

        selectOption();
}

// options selector
function selectOption(){
    _options.querySelectorAll('li').forEach((option) => {
        option.addEventListener('click', () => {
            if(_options.querySelector('.selected')){
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

// Check answer function
function checkAnswer(){
    _checkBtn.disabled = true;
    if(_options.querySelector('.selected')){
        let selectedAnswer = _options.querySelector('.selected span').textContent;
        if(selectedAnswer.trim() == HTMLDecode(correctAnswer)){
            correctScore++;
            _result.innerHTML = `<p class= "result"> <i class = "fas fa-check"></i>Correct Answer! </p>`;
        } else {
            _result.innerHTML = `<p class= "result"> <i class = "fas fa-times"></i>Incorrect Answer! </p>
             <p class ="result"> <small><b>Correct Answer: </b> ${correctAnswer}</small></p>`;
        }
        checkCount();
    } else {
        _result.innerHTML = `<p class="result"><i class = "fas fa-question"></i> Please
        select an option!</p>`;
        _checkBtn.disabled = false;
    }
}

// Code taken from https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
function HTMLDecode(textString){
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

// Checks the amount of questions answered in a function
function checkCount(){
    askedCount++;
    setCount();
    // when the question limit is reached
    if(askedCount == totalQuestion){
        // display the score
        _result.innerHTML += `
        <p class ="result"> Your score is ${correctScore}. </p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    // if not load next question
    } else {
        setTimeout(() => {
            loadQuestion();
        }, 2500);
    }
}

// Set the number for total questions and correct amonunt answered
function setCount(){
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}

// Set the values to their default and restart the quiz
function restartQuiz(){
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount();
    loadQuestion();
}

