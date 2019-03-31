const express = require('express');
const url = require('url')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const path = require('path');
const NeDB = require('nedb');
let db = new NeDB({
  filename: path.join(__dirname, 'db/mirai.db'),
  autoload: true
});
const s3Upload = require('./s3.js');
const ACCESS_KEY = process.env.access_key;

// 環境変数が一致した時のみCORSを許可する
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/db/addData', (req, res) => {
  const data = req.body

  //初期化
  db.remove({}, {multi: true}, (err, doc) => {
    //postされたデータを全てinsert
    data.forEach((value, index) => {
      if(value.filePath !=== '') {
        s3Upload(value.filePath)
      }
      db.insert(value, (err, doc) => {})
    })
  })
  res.send('sucsess')
});

app.get('/db/getData', (req, res) => {
  //ファイルをフォーマットするためにインスタンス生成し直す
  db = new NeDB({
    filename: path.join(__dirname, 'db/mirai.db'),
    autoload: true
  });
  db.find({}).sort({_id: 1}).exec((err, docs) => {
    res.send(docs);
  })
});


module.exports = {
  path: '/api',
  handler: app,
}
