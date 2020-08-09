const BookDao = require('../data/book-dao')
const db = require('../../config/database')

module.exports = (app) => {

  app.get('/', function (req, res) {
    res.marko(
      require('../views/books/list/list.marko')
    )
  })

  app.get('/livros', function (req, res) {

    const bookDao = new BookDao(db)

    bookDao.toList(function (err, result) {

      res.marko(
        require('../views/books/list/list.marko'),
        {
          books: result
        }
      )

    })

  })
}

