const displayResults = (results) => {
  let tableBody = document.getElementById("quiz-results-table");
  tableBody.innerHTML = "";

  results.forEach(result => {
    let row = `
      <tr>
        <td>${result.username}</td>
        <td>${result.category}</td>
        <td>${result.score} / ${result.totalQuestions}</td>
        <td>${result.date}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

const applyFilters = () => {
  let usernameFilter = document.getElementById("filter-username").value.toLowerCase();
  let categoryFilter = document.getElementById("filter-category").value;
  let sortBy = document.getElementById("sort-by").value;

  let quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];

  let filteredResults = quizHistory.filter(result => {
    return (
      (usernameFilter === "" || result.username.toLowerCase().includes(usernameFilter)) &&
      (categoryFilter === "" || result.category === categoryFilter)
    );
  });

  filteredResults.sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.date) - new Date(a.date);
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "score-desc":
        return (b.score / b.totalQuestions) - (a.score / a.totalQuestions);
      case "score-asc":
        return (a.score / a.totalQuestions) - (b.score / b.totalQuestions);
      default:
        return 0;
    }
  });

  displayResults(filteredResults);
}

window.onload = function () {
  let allResults = JSON.parse(localStorage.getItem("quizHistory")) || [];
  displayResults(allResults);
};



