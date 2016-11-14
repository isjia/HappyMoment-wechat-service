var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var WechatAPI = require('wechat-api');
var webot = require('wechat');
var config = require('./config/config_wiz');

var app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.query());

// 消息自动回复
app.post('/', webot(config.wechat, function(req, res, next){
  var message = req.weixin;
  console.log(message.FromUserName);

  res.reply({type: "text", content: message.Content});
}));

var api = new WechatAPI(config.wechat.appid, config.wechat.appSecret);

// 获取全部关注者列表
app.get('/followers', function(req, res){
  api.getFollowers(function(err, result){
    res.json({followers: result});
  });
});

app.get('/', function(req, res){
  res.send('HappyMoment wechat service dashboard Homepayge');
});



app.listen(3100, function(){
  console.log('Running on port 3100...');
});
