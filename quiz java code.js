const quizData = [
    {
        question: "What is the abbreviation of HTML?",
        answers: [
            { text: "Hyper text Mark-up Language", correct: true },
            { text: "Hypre translate Make text", correct: false },
            { text: "Hyper Text Marking Language", correct: false },
            { text: "Hyper Text Mark-up Law", correct: false }
        ]
    },
    {
        question: "Which language is primarily used for web development?",
        answers: [
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C++", correct: false },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "What does the break line tag do?",
        answers: [
            { text: "To make brackets in webpage", correct: false },
            { text: "Inserts a single line break", correct: true },
            { text: "paragraphing the content", correct: false },
            { text: "to bold the text", correct: false }
        ]
    },
    {
        question: "Who is making the Web standards?",
        answers: [
            { text: "Google", correct: false },
            { text: "Mozilla", correct: false },
            { text: "The World Wide Web Consortium", correct: true },
            { text: "Microsoft", correct: false }
        ]
    },
    {
        question: "Choose the correct HTML element for the largest heading?",
        answers: [
            { text: "<h6>", correct: false },
            { text: "<h1>", correct: true },
            { text: "<heading>", correct: false },
            { text: "<head>", correct: false }
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
