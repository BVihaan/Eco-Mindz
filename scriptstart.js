// Get references to DOM elements
const startupScreen = document.getElementById("startup-screen");
const quizContainer = document.getElementById("quiz-container");
const startButton = document.getElementById("start-button");

const backgroundMusic = document.getElementById("background-music");
const muteButton = document.getElementById("mute-button");
const unmuteButton = document.getElementById("unmute-button");

// Start button to move to the quiz page
startButton.addEventListener("click", () => {
    startupScreen.style.display = "none"; // Hide the startup screen
    quizContainer.style.display = "block"; // Show the quiz container

    backgroundMusic.play(); // Start background music
    muteButton.style.display = "inline-block"; // Show mute button

 // Start button redirects to index.html
        document.getElementById("start-button").addEventListener("click", function() {
            window.location.href = "index.html"; // Redirects to index.html
});

});

// Mute/Unmute functionality
muteButton.addEventListener("click", () => {
    backgroundMusic.pause();
    muteButton.style.display = "none";
    unmuteButton.style.display = "inline-block";
});

unmuteButton.addEventListener("click", () => {
    backgroundMusic.play();
    unmuteButton.style.display = "none";
    muteButton.style.display = "inline-block";
});

// Example of how to load questions (You would replace this with your own logic)
const questions = [
    { question: "What is climate change?", answers: ["Global warming", "Tidal wave", "Sunburn", "Rainy day"], correct: 0 },
    { question: "What gas contributes the most to the greenhouse effect?", answers: ["Carbon dioxide", "Oxygen", "Nitrogen", "Helium"], correct: 0 }
];

// Load first question
let currentQuestionIndex = 0;
const questionSection = document.getElementById("question-section");
const answersSection = document.getElementById("answers-section");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionSection.innerHTML = currentQuestion.question;
    answersSection.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(index));
        answersSection.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestionIndex].correct) {
        alert("Correct!");
    } else {
        alert("Wrong answer!");
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert("Quiz finished!");
    }
}

// Start by loading the first question
document.addEventListener("click", loadQuestion, { once: true });
