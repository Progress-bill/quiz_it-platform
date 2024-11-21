const quizData = [
    {
        question: "Which of the following is a non metal that remains liquid at room temperature?",
        answers: [
            { text: "Bromine", correct: true },
            { text: "Phosphorous", correct: false },
            { text: "Helium", correct: false },
            { text: "Chlorine", correct: false }
        ]
    },
    {
        question: "Brass gets discoloured in air because of the presence of which of the following gases in air?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Hydrogen sulphide", correct: true },
            { text: "Carbon dioxide", correct: false },
            { text: "Nitrogen", correct: false }
        ]
    },
    {
        question: "Chlorophyll is a naturally occurring chelate compound in which central metal is?",
        answers: [
            { text: "copper", correct: false },
            { text: "magnesium", correct: true },
            { text: "iron", correct: false },
            { text: "calcium", correct: false }
        ]
    },
    {
        question: "Which of the following is used in pencils?",
        answers: [
            { text: "Graphite", correct: true },
            { text: "Silicon", correct: false },
            { text: "Charcoal", correct: false },
            { text: "Phosphorous", correct: false }
        ]
    },
    {
        question: "Which of the following metals forms an amalgam with other metals?",
        answers: [
            { text: "Tin", correct: false },
            { text: "zinc", correct: false },
            { text: "lead", correct: false },
            { text: "Mercury", correct: true }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const feedbackElement = document.getElementById('feedback');
const restartButton = document.getElementById('restart-btn');
const returnButton = document.getElementById('return-btn');

let currentQuestionIndex = 0;
let score = 0;

const returnUrl = "html slelection page.html";

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    restartButton.classList.add('hide');
    feedbackElement.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    feedbackElement.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    feedbackElement.classList.remove('hide');
    feedbackElement.innerText = correct ? "Correct!" : "Wrong Answer!";
    
    if (correct) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct) {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    if (currentQuestionIndex < quizData.length - 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.classList.add('hide');
        restartButton.classList.remove('hide');
        showFinalScore();
    }
}

function showFinalScore() {
    feedbackElement.innerText = `Quiz Completed! Your score: ${score} / ${quizData.length}`;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    }
});
restartButton.addEventListener('click', startQuiz);
returnButton.addEventListener('click', () => {
    window.location.href = returnUrl; // Redirect to the specified URL
});
// Start the quiz
startQuiz();
