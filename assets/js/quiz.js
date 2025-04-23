// =======================
// 🔹 DOM Elements
// =======================
const configContainer = document.querySelector(".config-container");
const answerOptions = document.querySelector(".answer-options");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const questionStatus = document.querySelector(".question-status");
const timerDisplay = document.querySelector(".time-duration");
const resultContainer = document.querySelector(".result-container");
const quizContainer = document.querySelector(".quiz-container");

// =======================
// 🔹 Quiz State Variables
// =======================
const time_limit = 15;
let currentTime = time_limit;
let timer = null;
let currentQuestion = null;
const questionsIndexHistory = [];
let correctAnswerCount = 0;
let quizCategory = "programming";
let numberOfQuestions = 5;

// =======================
// 🔹 Result Function
// =======================
const showResult = () => {
    // Display the result page and hide the quiz
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    const result = `You answered <b>${correctAnswerCount}</b> out of <b>${numberOfQuestions}</b> questions correctly!`;
    document.querySelector(".result-message").innerHTML = result;
}

// =======================
// 🔹 Reset Timer Function
// =======================
const resetTimer = () => {
    clearInterval(timer);
    currentTime = time_limit;
    timerDisplay.textContent = `${currentTime}s`;
}

// =======================
// 🔹 Timer Function
// =======================
const startTimer = () => {
    timer = setInterval(() => {
        currentTime--;
        timerDisplay.textContent = `${currentTime}s`;

        if (currentTime <= 0) {
            clearInterval(timer);
            highlightCorrectAnswer();
            // Show Next button
            nextQuestionBtn.style.visibility = "visible";

            quizContainer.querySelector(".quiz-timer").style.background = "#d40404";

            // Disable further clicks
            answerOptions.querySelectorAll(".answer-option").forEach(option => option.style.pointerEvents = "none");
        }
    }, 1000);
};

// =======================
// 🔹 Get Random Question from Category
// =======================
const getRandomQuestion = () => {
    const categoryQuestions = questions.find(cat => 
        cat.category.toLowerCase() === quizCategory.toLowerCase()
    )?.questions || [];

    // Stop if we've reached the max number of questions
    if (questionsIndexHistory.length >= Math.min(categoryQuestions.length, numberOfQuestions)) {
        return showResult();
    }

    // Filter out already asked questions
    const availableQuestions = categoryQuestions.filter((_, index) => 
        !questionsIndexHistory.includes(index)
    );

    // Pick random from remaining
    const randomQuestion = availableQuestions[Math.floor(Math.random() * categoryQuestions.length)];
    
    // Track question index to avoid repeats
    questionsIndexHistory.push(categoryQuestions.indexOf(randomQuestion));

    return randomQuestion;
};

// =======================
// 🔹 Highlight Correct Answer
// =======================
const highlightCorrectAnswer = () => {
    const correctOption = answerOptions.querySelectorAll(".answer-option")[currentQuestion.correctAnswer];
    correctOption.classList.add("correct");

    const icon = `<i class='bx bx-check-circle'></i>`;
    correctOption.insertAdjacentHTML("beforeend", icon);
};

// =======================
// 🔹 Handle Answer Selection
// =======================
const handleAnswer = (option, answerIndex) => {

    if (option.classList.contains('correct') || option.classList.contains('incorrect')) return;

    const isCorrect = currentQuestion.correctAnswer === answerIndex;
    option.classList.add(isCorrect ? 'correct' : 'incorrect');

    !isCorrect ? highlightCorrectAnswer() : correctAnswerCount++;

    if (!isCorrect) {
        const icon = `<i class='bx bx-x-circle'></i>`;
        option.insertAdjacentHTML("beforeend", icon);
    }else{
        const icon = `<i class='bx bx-check-circle'></i>`;
        option.insertAdjacentHTML("beforeend", icon);
    }

    // Disable further clicks
    answerOptions.querySelectorAll(".answer-option").forEach(option => option.style.pointerEvents = "none");

    // Show Next button
    nextQuestionBtn.style.visibility = "visible";

    // Stop timer
    clearInterval(timer);
};

// =======================
// 🔹 Render Current Question
// =======================
const renderQuestion = () => {
    currentQuestion = getRandomQuestion();
    if (!currentQuestion) return;

    answerOptions.innerHTML = "";
    document.querySelector(".question-text").textContent = currentQuestion.question;

    // Hide next button for now
    nextQuestionBtn.style.visibility = "hidden";

    quizContainer.querySelector(".quiz-timer").style.background = "#32313C";

    // Update question number status
    questionStatus.innerHTML = `<b>${questionsIndexHistory.length}</b> of <b>${numberOfQuestions}</b> Questions`;

    // Reset the timer
    resetTimer()

    // Start countdown
    startTimer();

    // Render answer options
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.classList.add("answer-option");
        li.textContent = option;
        answerOptions.appendChild(li);

        li.addEventListener("click", () => handleAnswer(li, index));
    });
};


// =======================
// 🔹 Start Quiz by Rendering questions
// =======================
const startQuiz = () => {
    configContainer.style.display = "none";
    quizContainer.style.display = "block";

    // Update quiz category and number of questions
    quizCategory = configContainer.querySelector(".category-option.active").textContent;
    numberOfQuestions = parseInt(configContainer.querySelector(".question-option.active").textContent);

    renderQuestion();
}

// =======================
// 🔹 Highlight (Category / No. of questions) on click
// =======================
document.querySelectorAll(".category-option, .question-option").forEach(option => {
    option.addEventListener("click", () => {
        const currentActive = option.parentNode.querySelector(".active");
        if (currentActive){
            currentActive.classList.remove("active");
        }
        option.classList.add("active");
    });
});

// =======================
// 🔹 Reset Quiz by Reseting everything
// =======================
const resetQuiz = () => {
    resetTimer();
    correctAnswerCount = 0;
    questionsIndexHistory.length = 0;
    resultContainer.style.display = "none";
    configContainer.style.display = "block";
}

// =======================
// 🔹 Handle "Next Question" Click
// =======================
nextQuestionBtn.addEventListener("click", renderQuestion);

// =======================
// 🔹 Reset Quiz by clicking try again button
// =======================
document.querySelector(".try-again-btn").addEventListener("click", resetQuiz);

// =======================
// 🔹Start Quiz by clicking try again button
// =======================
document.querySelector(".start-quiz-btn").addEventListener("click", startQuiz);
