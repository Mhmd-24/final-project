const answerOptions = document.querySelector(".answer-options");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const questionStatus = document.querySelector(".question-status");
const numberOfQuestions = 5;


let quizCategory = "programming";
let currentQuestion = null;
const questionsIndexHistory = [];

const getRandomQuestion = () => {
  const categoryQuestions = questions.find(cat => 
    cat.category.toLowerCase() === quizCategory.toLowerCase()
  )?.questions || [];

  if(questionsIndexHistory.length >= Math.min(categoryQuestions.length, numberOfQuestions)){
    return console.log("BYEBEYBYE");
  }

  const availableQuestions = categoryQuestions.filter((_, index) => !questionsIndexHistory.includes(index));

  const randomQuestion = availableQuestions[Math.floor(Math.random() * categoryQuestions.length)];
  questionsIndexHistory.push(categoryQuestions.indexOf(randomQuestion));
  return randomQuestion;
};

const highlightCorrectAnswer = () => {
    const correctOption = answerOptions.querySelectorAll(".answer-option")[currentQuestion.correctAnswer];
    correctOption.classList.add("correct");
    const icon = `<i class='bx bx-check-circle'></i>`;
    correctOption.insertAdjacentHTML("beforeend", icon);
}

const handleAnswer = (option, answerIndex) => {
  const isCorrect = currentQuestion.correctAnswer === answerIndex;
  option.classList.add(isCorrect ? 'correct' : 'incorrect');
  !isCorrect ? highlightCorrectAnswer() : "";

  const icon = `<i class='bx bx-x-circle'></i>`;
  option.insertAdjacentHTML("beforeend", icon);

  answerOptions.querySelectorAll(".answer-option").forEach(option => option.style.pointerEvents = "none");

  nextQuestionBtn.style.visibility = "visible";
}

const renderQuestion = () => {
  currentQuestion = getRandomQuestion();
  if (!currentQuestion) return;

  answerOptions.innerHTML = "";

  document.querySelector(".question-text").textContent = currentQuestion.question;

  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.classList.add("answer-option");
    li.textContent = option;
    answerOptions.appendChild(li);
    li.addEventListener("click", () => handleAnswer(li, index));

  nextQuestionBtn.style.visibility = "hidden";

  questionStatus.innerHTML = `<b>${questionsIndexHistory.length}</b> of <b>${numberOfQuestions}</b> Questions`;

  });
};

renderQuestion();

nextQuestionBtn.addEventListener("click", renderQuestion);


