//API Used: http://newsapi.org/s/india-news-api
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const progressBar = document.querySelector(".progress-bar");

// "in" stands for India
const country = "in";
const options = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
    "nation",
    "world",
];


//100 requests per day
let requestURL;

const toggleProgressBar = (show) => {
    const progressBarContainer = document.getElementById("progressBarContainer");
    progressBarContainer.style.display = show ? "flex" : "none";
};

//Create cards from data
const generateUI = (articles) => {
  for (let item of articles) {
      let card = document.createElement("div");
      card.classList.add("news-card");
      card.innerHTML = `<div class="news-image-container">
          <img src="${item.image || "./img/newspaper.jpg"}" alt="news" />
      </div>
      <div class="news-content">
          <div class="news-title">
              ${item.title}
          </div>
          <div class="news-description">
              ${item.description || item.content || ""}
          </div>
          <p class="publish-date">Published At: ${item.publishedAt}</p>
          <a href="${item.url}" target="_blank" class="view-button">Read More</a>
      </div>`;
      container.appendChild(card);
  }
};


//  <a href="https://newsapi.org/v2/everything?q=${item.title}&sortBy=popularity&apiKey=${apiKey}" target="_blank" class="view-button">Search</a>


// const generateUI = (articles) => {
//     for (let item of articles) {
//         let card = document.createElement("div");
//         card.classList.add("news-card");

//         // Wrap the card with a link to the detailed article page
//         card.innerHTML = `<a href="article.html?url=${encodeURIComponent(item.url)}&title=${encodeURIComponent(item.title)}">
//             <div class="news-image-container">
//                 <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
//             </div>
//             <div class="news-content">
//                 <div class="news-title">${item.title}</div>
//                 <div class="news-description">${item.description || item.content || ""}</div>
//                 <a href="${item.url}" target="_blank" class="view-button">Read More</a>
//             </div>
//         </a>`;

//         container.appendChild(card);
//     }
// };


//News API Call
const getNews = async () => {
    toggleProgressBar(true); // Show the progress bar

    container.innerHTML = "";
    let response = await fetch(requestURL);
    if (!response.ok) {
        alert("Data unavailable at the moment. Please try again later");
        toggleProgressBar(false); // hide the progress bar
        return false;
    }
    let data = await response.json();
    generateUI(data.articles);
    toggleProgressBar(false); // hide the progress bar

};

//Category Selection
// Category Selection
const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
      element.classList.remove("active");
  });
  requestURL = `https://gnews.io/api/v4/top-headlines?category=${category}&country=in&lang=en&apikey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};



//Options Buttons
const createOptions = () => {
    for (let i of options) {
        optionsContainer.innerHTML += `<button class="option ${i == "general" ? "active" : ""
            }" onclick="selectCategory(event,'${i}')">${i}</button>`;
    }
};

const init = () => {
    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
};

window.onload = () => {
  requestURL = `https://gnews.io/api/v4/top-headlines?category=general&country=in&lang=en&apikey=${apiKey}`;
    init();
};


// Get the button element
let mybutton = document.getElementById("myBtn");

// Show the button when scrolling down
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "flex";
  } else {
    mybutton.style.display = "none";
  }
}

// Scroll to the top when the button is clicked
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}
