var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var sha1 = require('sha1');
var config = require('./config/default');

var app = express();
app.use(bodyParser.json());
app.use(logger('dev'));

// 消息自动回复
app.get('/', function(req, res){
  var token = config.wechat.token;
  var signature = req.query.signature;
  var nonce = req.query.nonce;
  var timestamp = req.query.timestamp;
  var echostr = req.query.echostr;

  var str = [token, timestamp, nonce].sort().join('');
  var sha = sha1(str);

  if (sha === signature){
    console.log('success');
    res.send(echostr);
  }
  else {
    console.log('fail');
    res.send('error');
  }
});


app.listen(3100, function(){
  console.log('Running on port 3100...');
});
