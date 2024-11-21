const quizData = [
    {
        question: "In which decade was the American Institute of Electrical Engineers (AIEE) founded?",
        answers: [
            { text: "1850s", correct: false },
            { text: "1880s", correct: true },
            { text: "1930s", correct: false },
            { text: "1950s", correct: false }
        ]
    },
    {
        question: "What is part of a database that holds only one type of information?",
        answers: [
            { text: "Report", correct: false },
            { text: "Field", correct: true },
            { text: "Record", correct: false },
            { text: "File", correct: false }
        ]
    },
    {
        question: "'OS' computer abbreviation usually means?",
        answers: [
            { text: "Order of Significance", correct: false },
            { text: "Open Software", correct: false },
            { text: "Operating System", correct: true },
            { text: "Optical Sensor", correct: false }
        ]
    },
    {
        question: "In which decade with the first transatlantic radio broadcast occur?",
        answers: [
            { text: "1850s", correct: false },
            { text: "1860s", correct: false },
            { text: "1870s", correct: false },
            { text: "1900s", correct: true }
        ]
    },
    {
        question: "'MOV' extension refers usually to what kind of file?",
        answers: [
            { text: "Image file", correct: false },
            { text: "Animation/movie file", correct: true },
            { text: "Audio file", correct: false },
            { text: "MS Office document", correct: false }
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
