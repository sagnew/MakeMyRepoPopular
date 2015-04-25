var Github = require('./github')
var fs = require('fs')
var MongoClient = require('mongodb').MongoClient
var async = require('async')
var since
var currentToken 
var tokens
var url = 'mongodb://localhost/karachi'
var client

MongoClient.connect(url, function (err, db) { 
  var collection = db.collection('projects')
  fs.readFile('token.txt', {
    encoding: 'utf8'
  }, function (err, data) { 
    tokens = data.split(',').map(function (key) { 
      return key.trim()
    })
    currentToken = 0
    client = new Github(tokens[currentToken])
    client.getAll(getAllHandler)
  })
  
  function getAllHandler (err, res, body) { 
    if (err) console.log(err)
    console.log('remaining calls ' + res.headers['x-ratelimit-remaining'])
    if (res.headers['x-ratelimit-remaining'] == 0) {
      if (currentToken == 0) currentToken = 1  
      else currentToken = 0
      client = new Github(token[currentToken])
      return client.getAll(since, getAllHandler)
    }
    body = Array.prototype.slice.apply(JSON.parse(body))

    var q = async.queue(function (task, cb) { 
      console.log(task)
      client.getRepo(task.name, function (e,r,repo) { 
        if (e) {
          console.lg
          cb(e)
        }
        repoInfo = JSON.parse(repo) // stuff we know about the repo
        collection.insert(repo, function (err, result) {
          if (err) cb(err)
          if (task.i == body.length - 1) {
            since = repo.id
            cb()
          }
        })
      })
    }, body.length)

    q.drain = function () {
      console.log('done with this batch')
      return client.getAll(since, getAllHandler)
    } 
    console.log(body.length)
    for (var i = 0; i < body.length; i++) { 
      var repo = body[i] 
      if (!repo.fork) { 
        q.push({name:repo['full_name'], i: i}, function (err) { 
          if (err) { console.log(err) } console.log('finished processing i ' + i) 
        }) 
      } 
    } 
  }
})

