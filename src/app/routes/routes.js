module.exports = (app) => {
  
  app.get('/', function(req, res){
    res.marko(
      require('../views/books/list/list.marko')
    )
  })  

  app.get('/livros', function(req, res){
    res.marko(
      require('../views/books/list/list.marko')
    )
  })  
}

