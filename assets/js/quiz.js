// https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple

const question = document.getElementById('question');
const options = document.querySelector('.quiz-questions');
async function loadQuestion(){
    const APIUrl = 'https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple';
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    //console.log(data.results[0]);
    showQuestion(data.results[0])
}

function showQuestion(data){
    let correctAnswer = data.correct_answer;
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