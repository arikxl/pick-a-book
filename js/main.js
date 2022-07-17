const searchBar = document.querySelector('input');
const bookListHeadline = document.querySelector('h2');
const bookListContainer = document.querySelector('section');
const BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q=";
const defaultImg = "https://media.giphy.com/media/YFxJ7u3FdCrdK/giphy.gif";

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

    let searchQuery = searchBar.value; 
    if (searchQuery==="" || searchQuery === null) alert("Please search some books");
    else {
        fetch(`${BOOKS_API}${searchQuery}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.totalItems === 0) alert('No books found');
          else {
            showBooksResults(data.items);
          }
        })
        .catch(function (error) {
          alert('something went wrong' + error);
        });
    }
    searchBar.value="";
  })
  
  function showBooksResults(books) {
  bookListContainer.innerHTML ="";
  bookListHeadline.innerHTML = ""
  bookListHeadline.innerHTML += `
    Here is your books:
  `
  books.map(book => {
    bookListContainer.innerHTML += `
    <card key =${book.id}>
      <h3>${book.volumeInfo.title}</h3>
      <img src=${(book.volumeInfo.imageLinks) 
        ? src=book.volumeInfo.imageLinks.thumbnail 
        : defaultImg }
        alt=${book.volumeInfo.title}/> 
      <p>${book.volumeInfo.description 
        ? book.volumeInfo.description.slice(0,50)+'...' 
        : book.volumeInfo.subtitle }
      </p>
    </card>
    `
  })
}
