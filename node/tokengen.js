var express = require('express')
var request = require('request')
var qs = require('qs')
var fs = require('fs')
var http = require('http')
var app = express()

app.get('/login', function (req, res) { 
  res.redirect('https://github.com/login/oauth/authorize?' + qs.stringify({
    'client_id': process.env['id'],
    'state': 'ASVDSVSDF',
    'redirect_uri': 'http://7435e232.ngrok.com/callback'
  }))
})

app.get('/callback', function(req,res) { 
  console.log('callback hit')
  var code = req.query.code || null
  var state = req.query.state || null
  console.log(state, code)

  var opts = { 
    'method':'POST',
    'url': 'https://github.com/login/oauth/access_token',
     json: {
      'client_id': process.env['id'], 
      'client_secret': process.env['secret'],
      'code': code
    }
  }

  request(opts, function (err,r,body) { 
    console.log(body.access_token)
    fs.appendFile('token.txt', body.access_token, function (e) { 
      if (e) throw e
      res.send(body.access_token)
    })
  })

}) 

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

http.createServer(app).listen('8000', '127.0.0.1')

