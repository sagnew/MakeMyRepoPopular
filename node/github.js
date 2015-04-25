var request = require('request')

function Github (token) { 
  this.token = token // github access token 
  this.base = 'https://api.github.com'
  this.userAgent = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5'
}

Github.prototype.getAll = function (since, cb) {
  var _this = this
  if (typeof since == 'function') {
    cb = since 
    since = 0
  }
  var opts = {
    qs: { 
      since: since
    },
    headers: { 
      'Authorization': 'token ' + _this.token,
      'User-Agent': _this.userAgent
    },
    uri: _this.base + '/repositories'
  } 
  return request(opts, cb)
}

module.exports = Github
