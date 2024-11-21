const quizData = [
    {
        question: "Radiocarbon is produced in the atmosphere as a result of?",
        answers: [
            { text: "collision between fast neutrons and nitrogen nuclei present in the atmosphere", correct: true },
            { text: "action of ultraviolet light from the sun on atmospheric oxygen", correct: false },
            { text: "action of solar radiations particularly cosmic rays on carbon dioxide present in the atmosphere", correct: false },
            { text: "lightning discharge in atmosphere", correct: false }
        ]
    },
    {
        question: "It is easier to roll a stone up a sloping road than to lift it vertical upwards because?",
        answers: [
            { text: "work done in rolling is more than in lifting", correct: false },
            { text: "work done in lifting the stone is equal to rolling it", correct: false },
            { text: "work done in both is same but the rate of doing work is less in rolling", correct: false },
            { text: "work done in rolling a stone is less than in lifting it", correct: true }
        ]
    },
    {
        question: "The absorption of ink by blotting paper involves?",
        answers: [
            { text: "viscosity of ink", correct: false },
            { text: "capillary action phenomenon", correct: true },
            { text: "diffusion of ink through the blotting", correct: false },
            { text: "siphon action", correct: false }
        ]
    },
    {
        question: "Siphon will fail to work if?",
        answers: [
            { text: "the level of the liquid in the two vessels are at the same height", correct: true },
            { text: "the densities of the liquid in the two vessels are equal", correct: false },
            { text: "both its limbs are of unequal length", correct: false },
            { text: "the temperature of the liquids in the two vessels are the same", correct: false }
        ]
    },
    {
        question: "Large transformers, when used for some time, become very hot and are cooled by circulating oil. The heating of the transformer is due to?",
        answers: [
            { text: "the heating effect of current alone", correct: false },
            { text: "hysteresis loss alone", correct: false },
            { text: "intense sunlight at noon", correct: false },
            { text: "both the heating effect of current and hysteresis loss", correct: true }
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
