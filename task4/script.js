const quizData = [
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], answer: "Mars" },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Mark Twain"], answer: "William Shakespeare" },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
    { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" },
    { question: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Gold", "Osmium", "Oxide"], answer: "Oxygen" }
];

let currentIdx = 0;
let score = 0;
let timer;

const introScreen = document.getElementById("introScreen");
const userInputScreen = document.getElementById("userInputScreen");
const quizScreen = document.getElementById("quizScreen");
const completionScreen = document.getElementById("completionScreen");

const playerNameInput = document.getElementById("playerName");
const currentQuestionEl = document.getElementById("currentQuestion");
const optionsContainer = document.getElementById("optionsContainer");
const countdownEl = document.getElementById("countdown");
const finalScoreEl = document.getElementById("finalScore");
const resultMessageEl = document.getElementById("resultMessage");

document.getElementById("startButton").addEventListener("click", () => {
    introScreen.classList.add("hidden");
    userInputScreen.classList.remove("hidden");
});

document.getElementById("submitNameButton").addEventListener("click", () => {
    const playerName = playerNameInput.value.trim();
    if (playerName) {
        localStorage.setItem("playerName", playerName);
        userInputScreen.classList.add("hidden");
        quizScreen.classList.remove("hidden");
        loadQuestion();
    }
});

function loadQuestion() {
    if (currentIdx < quizData.length) {
        const { question, options } = quizData[currentIdx];
        currentQuestionEl.textContent = `Question ${currentIdx + 1}: ${question}`;
        optionsContainer.innerHTML = "";
        options.forEach(option => {
            const button = document.createElement("button");
            button.className = "btn";
            button.textContent = option;
            button.addEventListener("click", () => validateAnswer(option));
            optionsContainer.appendChild(button);
        });
        startCountdown();
    } else {
        displayResults();
    }
}

function startCountdown() {
    let timeLeft = 15;
    countdownEl.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        countdownEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function validateAnswer(selectedOption) {
    clearInterval(timer);
    const correctAnswer = quizData[currentIdx].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentIdx++;
    loadQuestion();
}

function displayResults() {
    quizScreen.classList.add("hidden");
    completionScreen.classList.remove("hidden");
    const playerName = localStorage.getItem("playerName");
    finalScoreEl.textContent = `${score} / ${quizData.length}`;
    resultMessageEl.textContent = score > 2 ? `Great job, ${playerName}!` : `Better luck next time, ${playerName}!`;
}

document.getElementById("restartButton").addEventListener("click", () => {
    score = 0;
    currentIdx = 0;
    completionScreen.classList.add("hidden");
    userInputScreen.classList.remove("hidden");
});
