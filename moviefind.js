const API_URL = "http://www.omdbapi.com/?apikey=8e2fef99&s=";
const API_URL_SEARCH = "http://www.omdbapi.com/?apikey=8e2fef99&i=";

var search_input = document.getElementById("search-input");
var card = document.getElementsByClassName("movie-cards")[0];

document.getElementsByClassName("search")[0].addEventListener("click", function () {
  const query = search_input.value.trim();
  if (query) {
    getMovies(API_URL + encodeURIComponent(query));
  }
});

async function getMovies(url) {
  try {
    const resp = await fetch(url);
    const respData = await resp.json();
    if (respData.Search) {
      showMovies(respData.Search);
    } else {
      card.innerHTML = "<p>No results found.</p>";
    }
  } catch (err) {
    card.innerHTML = "<p>Error fetching data.</p>";
    console.error(err);
  }
}

function showMovies(movies) {
  card.innerHTML = "";
  movies.forEach(async function (movie) {
    try {
      const movieData = await fetch(API_URL_SEARCH + movie.imdbID);
      const movieDataObj = await movieData.json();
      movie_display(movieDataObj);
    } catch (err) {
      console.error("Error fetching movie details:", err);
    }
  });
}

function movie_display(imovie) {
  const movieElm = document.createElement("div");
  movieElm.classList.add("card");

  movieElm.innerHTML = `
    <img src="${imovie.Poster}" alt="Poster" width="300px" height="300px"/>
    <div class="movie-description">
      <div class="movie-title"><b>Title:</b> <span class="value">${imovie.Title}</span></div>
      <div class="movie-title"><b>Rating:</b> <span class="value">${imovie.imdbRating}</span></div>
      <div class="movie-title"><b>Director:</b> <span class="value">${imovie.Director}</span></div>
      <div class="movie-title"><b>Released Date:</b> <span class="value">${imovie.Released}</span></div>
      <div class="movie-title"><b>Genre:</b> <span class="value">${imovie.Genre}</span></div>
    </div>
  `;
  card.appendChild(movieElm);
}
