
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentImageContainer = document.getElementById('current-image-container');
const searchHistory = document.getElementById('search-history');

// Function to fetch the current image of the day
async function getCurrentImageOfTheDay() {
  try {
    const currentDate = new Date().toISOString().split("T")[0];
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${YOUR_API_KEY}&date=${currentDate}`);
    const data = await response.json();
    displayImage(data);
  } catch (error) {
    console.log(error);
  }
}

// Function to fetch and display the image of the day for a specific date
async function getImageOfTheDay(date) {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${YOUR_API_KEY}&date=${date}`);
    const data = await response.json();
    displayImage(data);
    saveSearch(date);
    addSearchToHistory();
  } catch (error) {
    console.log(error);
  }
}

// Function to display the image data in the UI
function displayImage(data) {
  currentImageContainer.innerHTML = `
    <div class="card">
      <img src="${data.url}" alt="${data.title}">
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <p class="card-text">${data.explanation}</p>
      </div>
    </div>
  `;
}

// Function to save a search to local storage
function saveSearch(date) {
  let searches;
  if (localStorage.getItem('searches') === null) {
    searches = [];
  } else {
    searches = JSON.parse(localStorage.getItem('searches'));
  }
  searches.push(date);
  localStorage.setItem('searches', JSON.stringify(searches));
}

// Function to add a search to the search history list in the UI
function addSearchToHistory() {
  let searches;
  if (localStorage.getItem('searches') === null) {
    searches = [];
  } else {
    searches = JSON.parse(localStorage.getItem('searches'));
  }
  searchHistory.innerHTML = '';
  searches.forEach((search) => {
    const li = document.createElement('li');
    li.classList.add('search-history-item');
    li.textContent = search;
    searchHistory.appendChild(li);
  });
}

// Function to fetch and display the image data when a search history item is clicked
function displaySearch(event) {
  if (event.target.classList.contains('search-history-item')) {
    getImageOfTheDay(event.target.textContent);
  }
}

// Event listener for the search form submit button
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const date = searchInput.value;
  getImageOfTheDay(date);
  searchInput.value = '';
});

// Event listener for the search history list
searchHistory.addEventListener('click', displaySearch);

// On page load, fetch and display the current image of the day and add any previous searches to the search history list
getCurrentImageOfTheDay();
addSearchToHistory();
