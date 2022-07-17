const bookListContainer = document.querySelector('section');
const BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q=";
const defaultImg = "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
const searchBar = document.querySelector('input');

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
  console.log('books[0].volumeInfo:', books[5].volumeInfo)
  books.map(book => {
    bookListContainer.innerHTML += `
    <card >
    <h3>${book.volumeInfo.title}</h3>
     <img src=${(book.volumeInfo.imageLinks) ? src=book.volumeInfo.imageLinks.thumbnail :defaultImg }
     alt=${book.volumeInfo.title}/> 
    <p >${book.volumeInfo.description ? book.volumeInfo.description.slice(0,50)+'...' : book.volumeInfo.subtitle }</p>
    </card>
    `
  })
}
