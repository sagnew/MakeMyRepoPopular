var Github = require('./github')
var fs = require('fs')
var MongoClient = require('mongodb').MongoClient
var since
var currentToken 
var tokens
var url = 'mongodb://localhost/karachi'

MongoClient.connect(url, function (err, db) { 
  var collection = db.collection('projects')
  fs.readFile('token.txt', {
    encoding: 'utf8'
  }, function (err, data) { 
    tokens = data.split(',').map(function (key) { 
      return key.trim()
    })
    currentToken = 0
    var client = new Github(tokens[currentToken])
    client.getAll(handler)
  })
  
  function handler (err, res, body) { 
    if (err) console.log(err)
    if (res.headers['X-RateLimit-Remaining'] === 0) {
      if (currentToken == 0) currentToken = 1  
      else currentToken = 0
      client = new Github(token[currentToken])
      client.getAll(since, handler)
    }
    body = Array.prototype.slice.apply(JSON.parse(body))
    for (var i = 0; i < body.length; i++) { 
      var repo = body[i]
      console.log(repo.id)
      collection.insert(repo, function (err, result) {
        if (i == body.length - 1) {
          since = repo.id
          client.getAll(since, handler)
        }
      })
    }
  }
})
