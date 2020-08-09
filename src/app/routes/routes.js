const BookDao = require('../data/book-dao')
const db = require('../../config/database')

module.exports = (app) => {

  app.get('/', function (req, res) {
    res.marko(
      require('../views/home.marko')
    )
  })

  app.get('/books', function (req, res) {

    const bookDao = new BookDao(db)

    bookDao.toList()
      .then(books => res.marko(
        require('../views/books/list/list.marko'),
        {
          books: books
        }
      )
      )
      .catch(err => console.error(err))
  })

  app.get('/books/form', function (req, res) {
    res.marko(
      require('../views/books/form/form.marko')
    )
  })

  app.post('/books/', function (req, res) {
    console.log(req.body)

    const bookDao = new BookDao(db)

    bookDao.add(req.body)
      .then(res.redirect('/books'))
      .catch(err => console.error(err))
  })
}
