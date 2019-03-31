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
//const s3Upload = require('./s3.js');
const aws = require('aws-sdk');
aws.config.loadFromPath(path.join(__dirname, 'config.json'))
aws.config.update({region: 'ap-northeast-1'});
const s3 = new aws.S3();


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
      console.log("きてる？0")
      if(value.filePath !== '') {
        const decodedFile = new Buffer(value.filePath.replace(/^data:\w+\/\w+;base64,/, ''), 'base64')
        s3Upload(value.title ,decodedFile)
        value.filePath = ''
        console.log('filepath抹消')
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

function s3Upload(title, path) {
  console.log("きてる？2")
  console.log(path)

  const params = {
    Bucket: 'mrble-portfolio',
    Key: 'img/'+ title,
    Body: path,
    ContentType: 'image/jpeg'
  }

  console.log("きてる？22")
  s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
  });
  console.log("done!")
}


module.exports = {
  path: '/api',
  handler: app,
}
