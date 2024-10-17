// script.js

// Array of questions, options, correct answers, and explanations
const mediumQuestions = [
    {
        question: "What is the main greenhouse gas responsible for global warming?",
        options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
        answer: "Carbon Dioxide",
        explanation: "Carbon Dioxide (CO2) is the primary greenhouse gas emitted by human activities."
    },
    {
        question: "Which of the following is a renewable energy source?",
        options: ["Coal", "Natural Gas", "Wind", "Oil"],
        answer: "Wind",
        explanation: "Wind energy is renewable as it is generated by natural processes that are continuously replenished."
    },
    {
        question: "What is the effect of deforestation on climate change?",
        options: ["Increases CO2", "Reduces CO2", "No impact", "Lowers temperatures"],
        answer: "Increases CO2",
        explanation: "Deforestation increases CO2 levels because trees absorb carbon dioxide during photosynthesis."
    },
    {
        question: "What percentage of the Earth's water is freshwater?",
        options: ["3%", "50%", "20%", "75%"],
        answer: "3%",
        explanation: "Only 3% of Earth's water is freshwater, and much of it is frozen in glaciers and ice caps."
    },
    {
        question: "Which gas is mainly responsible for the depletion of the ozone layer?",
        options: ["Carbon Dioxide", "Chlorofluorocarbons (CFCs)", "Methane", "Nitrogen"],
        answer: "Chlorofluorocarbons (CFCs)",
        explanation: "CFCs are responsible for depleting the ozone layer, leading to increased UV radiation reaching the Earth's surface."
    },
    {
        question: "Which energy source is non-renewable?",
        options: ["Solar", "Wind", "Coal", "Hydroelectric"],
        answer: "Coal",
        explanation: "Coal is a non-renewable energy source because it takes millions of years to form."
    },
    {
        question: "What is the primary cause of sea level rise?",
        options: ["Melting glaciers", "Volcanic eruptions", "Earthquakes", "Solar flares"],
        answer: "Melting glaciers",
        explanation: "Melting glaciers and polar ice caps due to global warming contribute to rising sea levels."
    },
    {
        question: "What is the term for the warming of Earth due to trapped heat from the atmosphere?",
        options: ["Greenhouse effect", "El Niño", "Acid rain", "Ozone depletion"],
        answer: "Greenhouse effect",
        explanation: "The greenhouse effect occurs when gases like CO2 trap heat in Earth's atmosphere, warming the planet."
    },
    {
        question: "Which of the following is a major contributor to deforestation?",
        options: ["Urbanization", "Farming", "Mining", "All of the above"],
        answer: "All of the above",
        explanation: "Urbanization, farming, and mining all contribute to deforestation by clearing forests for land use."
    },
    {
        question: "Which type of farming reduces biodiversity?",
        options: ["Monoculture farming", "Crop rotation", "Permaculture", "Agroforestry"],
        answer: "Monoculture farming",
        explanation: "Monoculture farming reduces biodiversity by growing the same crop repeatedly, depleting soil nutrients."
    }
];

const hardQuestions = [
    {
        question: "Which country emits the most carbon dioxide annually?",
        options: ["United States", "China", "India", "Russia"],
        answer: "China",
        explanation: "China emits the most CO2 due to its large population and heavy reliance on coal for energy."
    },
    {
        question: "What is the primary source of methane emissions?",
        options: ["Landfills", "Coal mining", "Agriculture", "Oil extraction"],
        answer: "Agriculture",
        explanation: "Agriculture, especially livestock farming, is the largest source of methane emissions."
    },
    {
        question: "What is the average global temperature rise target set by the Paris Agreement?",
        options: ["1°C", "2°C", "3°C", "4°C"],
        answer: "2°C",
        explanation: "The Paris Agreement aims to limit global temperature rise to well below 2°C above pre-industrial levels."
    },
    {
        question: "What percentage of the world’s electricity is produced by renewable sources?",
        options: ["10%", "25%", "35%", "50%"],
        answer: "25%",
        explanation: "As of recent reports, about 25% of global electricity is generated from renewable sources like wind, solar, and hydroelectric power."
    },
    {
        question: "Which region of the world is experiencing the fastest temperature increase?",
        options: ["Antarctica", "Africa", "The Arctic", "South America"],
        answer: "The Arctic",
        explanation: "The Arctic is warming twice as fast as the global average due to climate change."
    }
];

const allQuestions = [...mediumQuestions, ...hardQuestions]; // Combine medium and hard questions

let currentQuestionIndex = 0;  // Tracks the current question
let score = 0;                 // Tracks the player's score

// DOM Elements
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');

// Audio elements
const backgroundMusic = document.getElementById('background-music');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');

// Initialize game by playing background music and displaying the first question
document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic.volume = 0.2; // Reduce volume for smoother experience
    backgroundMusic.play();
    showQuestion(); // Show the first question
    updateProgressBar(); // Set initial progress
});

// Function to display the current question and options
function showQuestion() {
    const currentQuestion = allQuestions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = ''; // Clear previous options

    // Display the options as buttons
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => handleAnswer(option, currentQuestion.answer, currentQuestion.explanation));
        optionsElement.appendChild(button);
    });

    feedbackElement.innerHTML = ''; // Clear feedback
    nextButton.style.display = 'none'; // Hide the "Next" button initially
}

// Function to handle the player's answer and provide feedback
function handleAnswer(selectedOption, correctAnswer, explanation) {
    const feedbackMessage = selectedOption === correctAnswer 
        ? `<span style="color:green;">Correct!</span> ${explanation}` 
        : `<span style="color:red;">Wrong!</span> ${explanation}`;

    feedbackElement.innerHTML = feedbackMessage;

    if (selectedOption === correctAnswer) {
        correctSound.play(); // Play correct answer sound
        score++; // Increase score
    } else {
        wrongSound.play(); // Play wrong answer sound
    }

    // Show the "Next" button after an answer is selected
    nextButton.style.display = 'inline-block';
}

// Event listener for the "Next Question" button
nextButton.addEventListener('click', () => {
    currentQuestionIndex++; // Move to the next question

    if (currentQuestionIndex < allQuestions.length) {
        showQuestion(); // Display the next question
        updateProgressBar(); // Update progress bar
    } else {
        // End of the game, show final score
        displayFinalScore();
    }
});

// Function to update the progress bar based on the current question
function updateProgressBar() {
    const progressPercentage = ((currentQuestionIndex + 1) / allQuestions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// Function to display the final score and end message
function displayFinalScore() {
    questionElement.innerHTML = ``;
    optionsElement.innerHTML = ``;
    feedbackElement.innerHTML = `<h1>Congratulations!</h1><h2>You have gotten ${score}/15</h2><h3>Thank you for playing!</h3>`;
    nextButton.style.display = 'none'; // Hide "Next" button at the end of the quiz
}

// Get the audio and buttons
const backgroundmusic = document.getElementById("backgroundmusic");
const muteButton = document.getElementById("mute-button");
const unmuteButton = document.getElementById("unmute-button");

// Play the music by default when the page loads
window.onload = () => {
    backgroundMusic.play();
    unmuteButton.style.display = "none";  // Hide the unmute button initially
};

// Mute button functionality
muteButton.addEventListener("click", () => {
    backgroundMusic.pause();
    muteButton.style.display = "none";  // Hide mute button
    unmuteButton.style.display = "inline-block";  // Show unmute button
});

// Unmute button functionality
unmuteButton.addEventListener("click", () => {
    backgroundMusic.play();
    unmuteButton.style.display = "none";  // Hide unmute button
    muteButton.style.display = "inline-block";  // Show mute button
});