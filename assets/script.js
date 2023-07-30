// Sample questions array (you can add more questions)
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Mars", "Venus", "Earth", "Jupiter"],
    answer: "Jupiter",
  },
  // Add more questions here
];

// Global variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

// DOM elements
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const timeRemainingElement = document.getElementById("time-remaining");
const startButton = document.getElementById("start-btn");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");
const highScoresElement = document.getElementById("high-scores");

// Function to start the quiz
function startQuiz() {
  startButton.style.display = "none";
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  feedbackElement.textContent = "";
  timeRemainingElement.textContent = timeLeft;

  // Start the timer
  timerInterval = setInterval(function () {
    timeLeft--;
    timeRemainingElement.textContent = timeLeft;

    if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
      endQuiz();
    }
  }, 1000);

  displayQuestion();
}

// Function to display a question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach(function (option) {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.classList.add("option");
    optionButton.addEventListener("click", function () {
      checkAnswer(option);
    });
    optionsContainer.appendChild(optionButton);
  });
}

// Function to check the user's answer
function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    score++;
    feedbackElement.textContent = "Correct!";
  } else {
    timeLeft -= 10;
    feedbackElement.textContent = "Wrong!";
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  questionElement.textContent = "Quiz Over!";
  optionsContainer.innerHTML = "";
  feedbackElement.textContent = "Your final score is: " + score;

  // Show the high score input section
  initialsInput.style.display = "inline";
  submitScoreButton.style.display = "inline";
  submitScoreButton.addEventListener("click", saveHighScore);
}

// Function to save the high score
function saveHighScore() {
  const initials = initialsInput.value.trim().toUpperCase();
  if (initials) {
    // Sample code to store the high score in local storage
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Display high scores
    displayHighScores();

    // Hide the high score input section
    initialsInput.style.display = "none";
    submitScoreButton.style.display = "none";
  }
}

// Function to display the high scores
function displayHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScoresElement.innerHTML = "";

  highScores.forEach(function (entry) {
    const scoreEntry = document.createElement("div");
    scoreEntry.textContent = entry.initials + ": " + entry.score;
    highScoresElement.appendChild(scoreEntry);
  });
}

// Event listener for the start button
startButton.addEventListener("click", startQuiz);
