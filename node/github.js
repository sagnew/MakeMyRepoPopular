var request = require('request')

function Github (token) { 
  this.token = token // github access token 
  this.base = 'https://api.github.com'
  this.userAgent = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5'
}

Github.prototype.getAll = function (since, cb) {
  if (typeof since == 'function') {
    cb = since 
    since = 0
  }
  var _this = this
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

Github.prototype.getRepo = function (repo, cb) {
  var _this = this
  var opts = {
    headers: { 
      'Authorization': 'token ' + _this.token,
      'User-Agent': _this.userAgent
    },
    uri: _this.base + '/repos/' + repo
  } 
  return request(opts, cb)
}

Github.prototype.getRepoStat = function (repo, cb) {
  var _this = this
  var opts = {
    headers: { 
      'Authorization': 'token ' + _this.token,
      'User-Agent': _this.userAgent
    },
    uri: _this.base + '/repos/' + repo + '/stats/contributors'
  } 
  return request(opts, cb)
}
module.exports = Github
