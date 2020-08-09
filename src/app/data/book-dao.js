class BookDao {

  constructor(db) {
    this._db = db
  }

  toList(callbackFn) {
    this._db.all(
      'SELECT * FROM livros',
      (err, results) =>
        callbackFn(err, results)
    )
  }
}

module.exports = BookDao