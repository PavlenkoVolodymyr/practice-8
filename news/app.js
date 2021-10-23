// fetch(url, {})
//   .then((response) => {
//     // console.log(response);
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);

//     if (data.response.status === "ok") {
//       console.log(data.response.results);
//     }
//   })
//   .catch((error) => console.log(error.message));

// apiUrl: "https://content.guardianapis.com/us-news/2021/aug/08/us-infrastructure-bill-senate-session-vote"
// id: "us-news/2021/aug/08/us-infrastructure-bill-senate-session-vote"
// isHosted: false
// pillarId: "pillar/news"
// pillarName: "News"
// sectionId: "us-news"
// sectionName: "US news"
// type: "article"
// webPublicationDate: "2021-08-08T17:59:18Z"
// webTitle: "Senate resumes infrastructure debate as Trump threatens Republicans who back bill"
// webUrl: "https://www.theguardian.com/us-news/202

class News {
  constructor(url, API_KEY) {
    this.API_KEY = API_KEY
    this.url = url + this.API_KEY
    this.prevButton = document.querySelector('#prev')
    this.nextButton = document.querySelector('#next')
    this.list = document.querySelector('.list')
    this.span = document.querySelector('.page-amount')
    this.input = document.querySelector('input')
    this.counter = 1
  }

  fetchNews = () => {
    let urlToFetch = this.url + '&' + 'page' + '=' + this.counter
    console.log(urlToFetch)
    fetch(urlToFetch, {})
      .then((response) => {
        // console.log(response);
        return response.json()
      })
      .then((data) => {
        // console.log(data);
        if (data.response.status === 'ok') {
          this.renderNews(data.response.results)
          this.renderPagination(data.response)
          //   console.log(data.response);
        }
      })
      .catch((error) => console.log(error.message))
  }

  renderNews = (arreyResults) => {
    this.list.innerHTML = ''
    const liCollection = arreyResults.map(
      ({ webPublicationDate, webTitle, webUrl }) => {
        let li = document.createElement('li')
        let a = document.createElement('a')
        let p = document.createElement('p')

        a.setAttribute('href', webUrl)
        a.setAttribute('target', '_blank')
        a.textContent = webTitle

        p.textContent = `pulicationDate: ${webPublicationDate}`

        a.append(p)
        li.append(a)
        return li
      },
    )
    this.list.append(...liCollection)
  }

  renderPagination = (response) => {
    //   response.pages
    //   response.currentPage

    this.input.value = response.currentPage
    this.span.textContent = 'of ' + response.pages
    console.log(response)
  }

  onPrevPage = () => {
    if (this.counter === 1) {
      this.prevButton.disabled = true
      return
    }
    this.counter -= 1
    this.fetchNews()
    // console.log("prev");
  }

  onNextPage = () => {
    if (this.counter > 1) {
      this.prevButton.disabled = false
    }
    this.counter += 1
    this.fetchNews()
    // console.log("next");
  }

  onInputChange = (event) => {
    console.log(event.target.value)
    this.counter = event.target.value
    this.fetchNews()
  }

  addListeners = () => {
    this.prevButton.addEventListener('click', this.onPrevPage)
    this.nextButton.addEventListener('click', this.onNextPage)
    this.input.addEventListener('input', this.onInputChange)
    window.addEventListener('load', this.fetchNews)
  }

  init = () => {
    this.addListeners()
    // console.log("start");
  }

  // vova = "Vova";
}

const API_KEY = '8a2ca809-4d86-4fab-8908-001d9a317e38'

const url = `https://content.guardianapis.com/search?q=debate&api-key=`

new News(url, API_KEY).init()

// console.log(new News().vova);
// синтаксис публичных полей класса
