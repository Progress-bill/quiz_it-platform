const quizData = [
    {
        question: "Former Australian captain Mark Taylor has had several nicknames over his playing career. Which of the following was NOT one of them?",
        answers: [
            { text: "Stumpy", correct: true },
            { text: "Stodge", correct: false },
            { text: "Helium Bat", correct: false },
            { text: "Tubby", correct: false}
        ]
    },
    {
        question: "Which was the 1st non Test playing country to beat India in an international match?",
        answers: [
            { text: "Canada", correct: false },
            { text: "Zimbabwe", correct: false },
            { text: "Sri Lanka", correct: true },
            { text: "East Africa", correct: false }
        ]
    },
    {
        question: "Track and field star Carl Lewis won how many gold medals at the 1984 Olympic games??",
        answers: [
            { text: "Four", correct: true },
            { text: "two", correct: false },
            { text: "eight", correct: false },
            { text: "three", correct: false }
        ]
    },
    {
        question: "Which county did Ravi Shastri play for?",
        answers: [
            { text: "Pakistan", correct: false },
            { text: "Leicestershire", correct: false },
            { text: "New-Zealand", correct: false },
            { text: "Glamorgan", correct: true }
        ]
    },
    {
        question: "In which year was Messi's first ballon d'or?",
        answers: [
            { text: "2011", correct: false },
            { text: "2018", correct: false },
            { text: "20115", correct: false },
            { text: "2009", correct: true }
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
