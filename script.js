const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentImageContainer = document.getElementById("current-image-container");
const searchHistory = document.getElementById("search-history");

const API_KEY = "eadvk8qNDm5KTzS9MJJBDOpVOdcdkv5DkWCg07Bd";

function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${currentDate}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      currentImageContainer.innerHTML = `
        <div class="card">
          <img src="${data.url}" class="card-img-top" alt="${data.title}">
          <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text">${data.explanation}</p>
          </div>
        </div>
      `;
    })
    .catch((error) => console.log(error));
}

function getImageOfTheDay(date) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      currentImageContainer.innerHTML = `
        <div class="card">
          <img src="${data.url}" class="card-img-top" alt="${data.title}">
          <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text">${data.explanation}</p>
          </div>
        </div>
      `;

      saveSearch(date);
      addSearchToHistory();
    })
    .catch((error) => console.log(error));
}

function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory() {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];

  searchHistory.innerHTML = searches
    .map((search) => `<li class="list-group-item">${search}</li>`)
    .join("");

  searchHistory.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      getImageOfTheDay(li.textContent);
    });
  });
}

getCurrentImageOfTheDay();

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const date = searchInput.value;
  getImageOfTheDay(date);
});

addSearchToHistory();
