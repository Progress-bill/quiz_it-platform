const quizData = [
    {
        question: "Who invented the BALLPOINT PEN?",
        answers: [
            { text: "Biro Brothers", correct: true },
            { text: "Waterman Brothers", correct: false },
            { text: "Bicc Brothers", correct: false },
            { text: "Write Brothers", correct: false}
        ]
    },
    {
        question: "In which decade was the first solid state integrated circuit demonstrated?",
        answers: [
            { text: "1950s", correct: true },
            { text: "1960s", correct: false },
            { text: "1970s", correct: false },
            { text: "1980s", correct: false }
        ]
    },
    {
        question: "What J. B. Dunlop invented?",
        answers: [
            { text: "Pneumatic rubber tire", correct: true },
            { text: "Automobile wheel rim", correct: false },
            { text: "Rubber boot", correct: false },
            { text: "Model airplanes", correct: false }
        ]
    },
    {
        question: "Which scientist discovered the radioactive element radium?",
        answers: [
            { text: "Isaac Newton", correct: false },
            { text: "Albert Einstein", correct: false },
            { text: "Benjamin Franklin", correct: false },
            { text: "Marie Curie", correct: true }
        ]
    },
    {
        question: "When was barb wire patented?",
        answers: [
            { text: "1874", correct: true },
            { text: "1840", correct: false },
            { text: "1895", correct: false },
            { text: "1900", correct: false }
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
