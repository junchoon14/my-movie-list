(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const dataPanel = document.getElementById('data-panel')
  const displaySwitch = document.getElementById('display-switch')
  const showCard = document.querySelector('.show-card')
  const showList = document.querySelector('.show-list')
  const data = JSON.parse(localStorage.getItem('favoriteMovies')) || []

  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-show-movie')) {
      showMovie(event.target.dataset.id)
    } else if (event.target.matches('.btn-remove-favorite')) {
      removeFavoriteItem(event.target.dataset.id)
    }
  })

  displaySwitch.addEventListener('click', event => {
    console.log(event.target)
    if (event.target.matches('.show-card')) {
      localStorage.setItem('display', 'card')
    } else if (event.target.matches('.show-list')) {
      localStorage.setItem('display', 'list')
    }
    displayDataList(data)
  })


  displayDataList(data)

  function displayDataList(data) {
    let display = localStorage.getItem('display') || 'card'
    let htmlContent = ''
    if (display === 'list') {
      htmlContent += `<ul class="list list-group">`
      data.forEach(function (item, index) {
        htmlContent += `
          <li class="list-group-item rounded-0 border-right-0 border-left-0 clearfix" id="">
            <div class="item-body movie-item-body float-left">
              <h5 class="item-title mt-1">${item.title}</h5>
            </div>

            <div class="list-footer float-right" d>
              <!----- "More" button ------>
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
              <!----- favorite button ----> 
              <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">-</button>
            </div>
          </li>
      `
      })
      htmlContent += `
        </ul >
      `
    } else if (display === 'card') {
      data.forEach(function (item, index) {
        htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h5>
            </div>

            <!-- "More" button -->
             <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
              <!-- favorite button --> 
              <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">-</button>
            </div>
          </div>
        </div>
      `
      })
    }
    dataPanel.innerHTML = htmlContent
  }

  function removeFavoriteItem(id) {
    // find movie by id
    const index = data.findIndex(item => item.id === Number(id))
    if (index === -1) return

    // removie movie and update localStorage
    data.splice(index, 1)
    localStorage.setItem('favoriteMovies', JSON.stringify(data))

    // repaint dataList
    displayDataList(data)
  }


})()