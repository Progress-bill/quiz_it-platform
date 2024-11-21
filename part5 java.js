const quizData = [
    {
        question: "Ordinary table salt is sodium chloride. What is baking soda?",
        answers: [
            { text: "Potassium chloride", correct: false },
            { text: "Potassium carbonate", correct: false },
            { text: "Potassium hydroxide", correct: false },
            { text: "Sodium bicarbonate", correct: true}
        ]
    },
    {
        question: "Ozone hole refers to?",
        answers: [
            { text: "hole in ozone layer", correct: false },
            { text: "decrease in the ozone layer in troposphere", correct: false },
            { text: "decrease in thickness of ozone layer in stratosphere", correct: true },
            { text: "increase in the thickness of ozone layer in troposphere", correct: false }
        ]
    },
    {
        question: "Pine, fir, spruce, cedar, larch and cypress are the famous timber-yielding plants of which several also occur widely in the hilly regions of India. All these belong to?",
        answers: [
            { text: "angiosperms", correct: false },
            { text: "gymnosperms", correct: true },
            { text: "monocotyledons", correct: false },
            { text: "dicotyledons", correct: false }
        ]
    },
    {
        question: "Pollination is best defined as?",
        answers: [
            { text: "transfer of pollen from anther to stigma", correct: true },
            { text: "germination of pollen grains", correct: false },
            { text: "growth of pollen tube in ovule", correct: false },
            { text: "visiting flowers by insects", correct: false }
        ]
    },
    {
        question: "Plants receive their nutrients mainly from?",
        answers: [
            { text: "chlorophyll", correct: false },
            { text: "atmosphere", correct: false },
            { text: "light", correct: false },
            { text: "soil", correct: true }
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
