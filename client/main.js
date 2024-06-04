
const baseUrl = 'http://localhost:5252' // or if for prod 'onrender.com'

async function fetchBooks() {
  const response = await fetch(`${baseUrl}/books`)
  const books = await response.json()
  return books.results.books
}

async function displayBooks() {
  const books = await fetchBooks()
  const container = document.getElementById('app')

  console.log(books)
  books.forEach(book => {
    const bookElem = document.createElement('div')
    bookElem.innerHTML = 
   `
        <img src="${book.book_image}"/>
        <p>${book.author}</p>
    `
    const button = document.createElement('button')
    button.textContent = 'review'
    bookElem.appendChild(button)
    button.addEventListener('click', () => {
      toggleModal()
      const reviewForm = document.getElementById('review-form')
      reviewForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const formData = new FormData(reviewForm)
        const review = Object.fromEntries(formData)

        submitReview(book, review)
        toggleModal()
      })
    })
    container.appendChild(bookElem)
  })

}

displayBooks()

// toggleModal(book) 

function toggleModal() {
  let reviewForm = document.getElementById('review-form')
  reviewForm.classList.toggle('hidden')
}

async function addReview(book) {

}

function submitReview(book, review) {
  console.log(book, review)
}