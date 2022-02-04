// fetch('https://v2.jokeapi.dev/joke/Any?safe-mode')
// .then(res => res.json())
// .then(data => console.log(data))

/**
 * Explain to yourself the full feature
 * Breakdown feature(3 Question rule)
    * At what time can I do this event
        (domcontentloaded)
    * What's going to trigger this event?
        (click)
    * Effect (display homepage)
**/

/** Globals **/
const baseUrl = 'http://localhost:3000';
let movies = []


/** NODE Getters **/
const makeEl = el => document.createElement(el)
const mainDiv = () => document.getElementById('main')
const homePageLink = () => document.getElementById('home-page-link')
const movieListLink = () => document.getElementById('movie-list-link')
const searchMovieLink = () => document.getElementById('search-movie-link')
const nameInput = () => document.getElementById('name');
const releaseInput = () => document.getElementById('release');
const rankingInput = () => document.getElementById('ranking');
const posterInput = () => document.getElementById('poster');
/** Templates **/

const homePageTemplate = () => {
    return  `
    <h1 class="center-align">Tarantino's Band Apart</h1>
  `
}

const movieListTemplate = () => {
    
  
}

const movieTemplate = (movie) => {
    const tr = makeEl('tr');
    const tdName = makeEl('td');
    const tdRelease = makeEl('td');
    const tdRanking = makeEl('td');
    const tdPoster = makeEl('td');
    const tdPosterImg = makeEl('img')
    
    tdName.innerText = movie.name;
    tdRelease.innerText = movie.release;
    tdRanking.innerText = movie.ranking;
    tdPosterImg.src = movie.poster;
    tdPosterImg.id = 'image'

    tr.appendChild(tdName);
    tr.appendChild(tdRelease);
    tr.appendChild(tdRanking);
    tr.appendChild(tdPoster);
    tr.appendChild(tdPosterImg);

    return tr;
}

/** Renderers **/

const renderHomePage = () => {
    mainDiv().innerHTML = ''
    const h1 = makeEl('h1')
    h1.classList.add('center-align')
    h1.innerText = "Tarantino's Band Apart"
    mainDiv().appendChild(h1)
}

const renderMovieListPage = async () => {
   await loadMovies(); 
   mainDiv().innerHTML =  ''
   const h1 = makeEl('h1');
   const table = makeEl('table');
   const thead = makeEl('thead');
   const tr = makeEl('tr');
   const thName = makeEl('th');
   const thRelease = makeEl('th');
   const thRanking = makeEl('th');
   const thPoster = makeEl('th');
   const tbody = makeEl('tbody');
   
   h1.innerText = 'Movie Catalog'
   h1.classList.add('center-align')
   thName.innerText = 'Name';
   thRelease.innerText = 'Release';
   thRanking.innerText = 'Ranking';
   thPoster.innerText = 'Poster';
   thPoster.id = 'poster'
   thPoster.setAttribute('align', 'center') 
   thPoster.setAttribute('valign', 'middle') 
   table.classList.add('highlight');
   
   tr.appendChild(thName);
   tr.appendChild(thRelease);
   tr.appendChild(thRanking);
   tr.appendChild(thPoster);
   thead.appendChild(tr);
   table.appendChild(thead);
   movies.forEach(movie => tbody.appendChild(movieTemplate(movie)));
   table.appendChild(tbody);
   mainDiv().appendChild(h1);
   mainDiv().appendChild(table);
}

const renderMovies = () => {
    return movies.map(movie => movieTemplate(movie))
}

const renderFormLink = () => {
    const h1 = document.createElement('h1')
    const form = document.createElement('form')
    const nameDiv = document.createElement('div')
    const nameInput = document.createElement('input')
    const nameLabel = document.createElement('label')
    const releaseDiv = document.createElement('div')
    const releaseInput =document.createElement('input')
    const releaseLabel = document.createElement('label')
    const rankingDiv = document.createElement('div')
    const rankingInput = document.createElement('input')
    const rankingLabel = document.createElement('label')
    const posterDiv = document.createElement('div')
    const posterInput = document.createElement('input')
    const posterLabel = document.createElement('label')
    const submitBttn = document.createElement('input')
    
    h1.className = 'center-align'
    nameDiv.className = 'input-field'
    releaseDiv.className = 'input-field'
    rankingDiv.className = 'input-field'
    posterDiv.className = 'input-field'
    submitBttn.className = 'waves-effect waves-light btn'

    nameInput.setAttribute('id', 'name')
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('for', 'name')
    releaseInput.setAttribute('id', 'release')
    releaseInput.setAttribute('type', 'text')
    releaseInput.setAttribute('for', 'release')
    rankingInput.setAttribute('id', 'ranking')
    rankingInput.setAttribute('type', 'text')
    rankingInput.setAttribute('for', 'ranking')
    posterInput.setAttribute('id', 'poster')
    posterInput.setAttribute('type', 'img')
    posterInput.setAttribute('for', 'poster')
    submitBttn.setAttribute('type', 'submit')
    submitBttn.setAttribute('value', 'Search Movie')

    h1.innerText = 'Search QT Motion Picture'
    nameLabel.innerText = 'Name'
    releaseLabel.innerText = 'Release'
    rankingLabel.innerText = 'Ranking'
    posterLabel.innerText = 'Poster'

    nameDiv.appendChild(nameInput)
    nameDiv.appendChild(nameLabel)
    releaseDiv.appendChild(releaseInput)
    releaseDiv.appendChild(releaseLabel)
    rankingDiv.appendChild(rankingInput)
    rankingDiv.appendChild(rankingLabel)
    posterDiv.appendChild(posterInput)
    posterDiv.appendChild(posterLabel)


    // form.append(nameDiv, releaseDiv, rankingDiv, posterDiv, submitBttn)
    form.appendChild(nameDiv)
    form.appendChild(releaseDiv)
    form.appendChild(rankingDiv)
    form.appendChild(posterDiv)
    form.appendChild(submitBttn)

    form.addEventListener('submit', submitFormEvent)

    mainDiv().appendChild(h1)
    mainDiv().appendChild(form)

    // <form>
    //  <div class="input-field">
    //    <input id="name" type="text">
    //    <label for="name">Name</label>
    //  </div>
    //  <div class="input-field">
    //    <input id="release" type="text">
    //    <label for="release">Release</label>
    //  </div>
    //  <div class="input-field">
    //    <input id="ranking" type="text">
    //    <label for="ranking">Ranking</label>
    //  </div>
    //  <div class="input-field">
    //    <input id="poster" type="text">
    //    <label for="poster">Poster</label>
    //  </div>
    //   <input type="submit" value="Create Movie" class="waves-effect waves-light btn">
    // </form>
}


/** Events **/

const loadMovies = async () => {
    const resp = await fetch(baseUrl + '/movies')
    const data = await resp.json();
    movies = data;
}

const homepageLinkEvent = () => {
    homePageLink().addEventListener('click', (e) => {
        e.preventDefault()
        renderHomePage()
    })
}

const movieListEvent = () => {
    movieListLink().addEventListener('click', (e) => {
        e.preventDefault();
        renderMovieListPage
    })
}

const movieFormLinkEvent = () => {
    searchMovieLink().addEventListener('click', (e) => {
        e.preventDefault()
        renderFormLink();
    })
}

const submitFormEvent = e => {
    e.preventDefault()
    fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: nameInput().value,
            release: releaseInput().value,
            ranking: rankingInput().value,
            poster: posterInput().value
        })
    })
    .then(res => res.json())
    .then(movie => {
        renderMovieListPage();
    })
}
/******************/

/** WHEN THE DOM LOADS **/
document.addEventListener('DOMContentLoaded', () => {
    //renderHomePage();
    homepageLinkEvent();
    movieListEvent();
    movieFormLinkEvent();
})