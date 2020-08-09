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

  findById(id) {
    return new Promise((resolve, reject) => {
      this._db.get(`
        SELECT * FROM livros WHERE id = ?
      `,
        [id]
      ),
        (err, book) => {
          if (err)
            return reject(`It was not possible find the book.`)
          return resolve(book)
        }
    })
  }

  update(book) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        UPDATE livros
        SET titulo = ?, preco = ?, descricao = ?
        WHERE id = ?
      `,
        [
          book.titulo,
          book.preco,
          book.descricao,
          book.id
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

  remove(id) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        DELETE FROM livros
        WHERE id = ?
      `,
        [id]
      ),
        (err) => {
          if (err) {
            console.error(err)
            return reject(`It was not possible to delete the books`)
          }
          resolve()
        }
    })
  }
}

module.exports = BookDao