const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"))
const progressoTexto = document.getElementById('progressText');
const scoreText = document.getElementById('score');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [

    {
        question: "Quem foi a única na história a receber o Prêmio Nobel em áreas científicas diferentes?",
        choice1: "Linus Pauling",
        choice2: "Mahatma Gandhi",
        choice3:"Albert Einstein",
        choice4: "Marie Curie",
        answer: 4
        
    },
    
    {
        question: "Que país tem o formato de uma bota?",
        choice1: "Butão",
        choice2: "Brasil",
        choice3: "Itália",
        choice4: "México",
        answer: 3

    }, 


    {
        question: "De onde é a invenção do chuveiro elétrico?",
        choice1: "França",
        choice2: "Brasil",
        choice3: "Itália",
        choice4: "Inglaterra",
        answer: 2


    },

    {
        question: "Quantas casas decimais tem o número pi?",
        choice1: "Duas",
        choice2: "Centenas",
        choice3: "Infinitas",
        choice4: "Vinte",
        answer: 3


    },

    {
        question: "Atualmente, quantos elementos químicos a tabela periódica possui?",
        choice1: "113",
        choice2: "109",
        choice3: "118",
        choice4: "92",
        answer: 3


    }

    

  


];


//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuesions.length == 0 || questionCounter > MAX_QUESTIONS){
       localStorage.setItem("mostRecentScore", score);
        //GO TO THE END PAGE
        return window.location.assign("/end.html");
    
    }
    questionCounter++;
    progressText.innerText = questionCounter + "/" + MAX_QUESTIONS;


    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

      choices.forEach( choice => {
          const number = choice.dataset["number"];
          choice.innerText = currentQuestion["choice" + number];
});

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;

};

choices.forEach( choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;


        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswers = selectedChoice.dataset["number"];
        
        const classToApply = 
            selectedAnswers == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }
           
           
            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
    
            }, 1000);
     });
});

 incrementScore = num => {
     score += true;
     scoreText.innerText = score;
 }


startGame();