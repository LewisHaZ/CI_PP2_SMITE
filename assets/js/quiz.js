// https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple

const question = document.getElementById('question');
const options = document.querySelector('.quiz-questions');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 10;

document.addEventListener('DOMContentLoaded', () =>{
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
});

async function loadQuestion(){
    const APIUrl = 'https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple';
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    //console.log(data.results[0]);
    showQuestion(data.results[0])
}

function showQuestion(data){
    lcorrectAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    // inserting correct answer in a random position in the options list
    optionsList.splice(Math.floor(Math.random() * 
    (incorrectAnswer.length + 1)) , 0, correctAnswer); 

    question.innerHTML = `${data.question} <br> <span class ="category">${data.category}</span>`;
    options.innerHTML = `${optionsList.map((option, index) => `
        <li>  ${index + 1}. <span> ${option}</span></li>`).join('')}`;
}

loadQuestion();