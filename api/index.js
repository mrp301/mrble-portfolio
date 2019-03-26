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

app.post('/db/addData', (req, res) => {
  const data = req.body

  //初期化
  db.remove({}, {multi: true}, (err, doc) => {
    //postされたデータを全てinsert
    data.forEach((value, index) => {
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
