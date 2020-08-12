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
      require('../views/books/form/form.marko'),
      { book: {} }
    )
  })

  app.post('/books', function (req, res) {

    const bookDao = new BookDao(db)

    bookDao.add(req.body)
      .then(res.redirect('/books'))
      .catch(err => console.error(err))
  })

  app.put('/livros', function (req, res) {
    const bookDao = new BookDao(db)

    bookDao.update(req.body)
      .then(res.redirect('/books'))
      .catch(err => console.error(err))
  })

  app.delete('/books/:id', function (req, res) { // :id => to store the id sent dynamically by request
    const bookId = req.params.id
    const bookDao = new BookDao(db)
    bookDao.remove(bookId)
      .then(() => res.status(200).end()) // return 200
      .catch(err => console.error(err))

  })

  app.get('/books/form/:id', function (req, res) {
    const id = req.params.id;
    const bookDao = new BookDao(db);

    bookDao.findById(id)
      .then(book =>
        res.marko(
          require('../views/books/form/form.marko'),
          { book: book }
        )
      )
      .catch(err => console.log(err));

  });
}
