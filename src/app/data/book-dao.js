class BookDao {

  constructor(db) {
    this._db = db
  }

  toList() {
    return new Promise((resolve, reject) => {
      this._db.all(`SELECT * FROM livros`,
        (err, results) => {
          if (err)
            return reject(`It was not possible to list the books.`)
          return resolve(results)
        }
      )
    })
  }

  add(book) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        INSERT INTO livros 
        (titulo, preco, descricao) 
        VALUES (?,?,?)`,
        [
          book.titulo,
          book.preco,
          book.descricao
        ]),
        (err) => {
          if (err) {
            console.error(err)
            return reject(`It was not possible to add the book.`)
          }
          resolve()
        }
    })
  }
}

module.exports = BookDao