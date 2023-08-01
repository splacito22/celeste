//Quiz questions and answers
var questions = [
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>",
  },
  {
    question:
      'What is the correct way to select an element with the class "example" in CSS?',
    options: [".example", "#example", "element.example", "class.example"],
    answer: ".example",
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "const", "let", "int"],
    answer: "var",
  },
  {},
];

// Global variables
var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60;
var timerInterval;

// Function to start the quiz
function startQuiz() {
  //Hide the start button
  var startButton = document.querySelector("#start-btn");
  startButton.style.display = "none";
  //Reset variable and UI
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  displayQuestion();
  timerInterval = setInterval(updateTimer, 1000);

  //Function to update the timer
  function updateTimer() {
    var timeRemainingElement = document.querySelector("#time-remaining");
    timeRemainingElement.textContent = timeLeft;

    if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
      clearInterval(timerInterval);
      endQuiz();
    } else {
      timeLeft--;
    }
  }

  //Event listener for the submit button
  var submitScoreButton = document.querySelector("#submit-score");
  submitScoreButton.addEventListener("click", saveHighScore);
}

// Function to display a question
function displayQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var questionElement = document.querySelector("#question");
  var optionsContainer = document.querySelector("#options");

  //Display the current question and answer options
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
  var feedbackElement = document.querySelector("#feedback");
  var currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    // Correct Answer
    score++;
    feedbackElement.textContent = "Correct!";
  } else {
    // Wrong answer
    timeLeft -= 10; //Penalty for wrong answer
    feedbackElement.textContent = "Wrong!";
  }

  //Move to next question
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// Function to end the quiz
function endQuiz() {
  var questionElement = document.querySelector("#question");
  var optionsContainer = document.querySelector("#options");
  var feedbackElement = document.querySelector("#feedback");
  var startButton = document.querySelector("#start-btn");

  //Display quiz summary
  questionElement.textContent = "Quiz Over!";
  optionsContainer.innerHTML = "";
  feedbackElement.textContent = "Your final score is: " + score;

  // Show the high score input section
  var initialsInput = document.querySelector("#initials");
  var submitScoreButton = document.querySelector("#submit-score");
  initialsInput.style.display = "inline";
  submitScoreButton.style.display = "inline";
}

// Function to save the high score
function saveHighScore() {
  var initialsInput = document.querySelector("#initials");
  var initials = initialsInput.value.trim().toUpperCase();
  if (initials) {
    // Sample code to store the high score in local storage
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: initials, score: score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // Display high scores
    displayHighScores();

    // Hide the high score input section
    initialsInput.style.display = "none";
    var submitScoreButton = document.querySelector("#submit-score");
    submitScoreButton.style.display = "none";
  }
}

// Function to display the high scores
function displayHighScores() {
  var highScoresElement = document.querySelector("#high-scores");
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScoresElement.innerHTML = "";

  highScores.forEach(function (entry) {
    var scoreEntry = document.createElement("div");
    scoreEntry.textContent = entry.initials + ": " + entry.score;
    highScoresElement.appendChild(scoreEntry);
  });
}

// Event listener for the start button
var startButton = addEventListener("click", startQuiz);
var submitScoreButton = addEventListener("click", saveHighScore);
