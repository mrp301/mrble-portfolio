//参考：https://dev.classmethod.jp/server-side/node-js-server-side/node-js-base64-encoded-image-to-s3/
const express = require('express');
const url = require('url')
const bytes = require('bytes');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  limit: bytes.parse('50mb'),
  extended: true
}));
app.use(bodyParser.json({
  limit: bytes.parse('50mb'),
  extended: true
}));

//クロスドメイン許可
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const path = require('path');
const NeDB = require('nedb');
const apiAccessKey = process.env.apiAccessKey;
let db = new NeDB({
  filename: path.join(__dirname, 'db/mirai.db'),
  autoload: true
});

const aws = require('aws-sdk');
aws.config.update({
  accessKeyId: process.env.awsAccessKeyId,
  secretAccessKey: process.env.awsSecretAccessKey,
  region: 'ap-northeast-1'
});
const s3 = new aws.S3();

app.post('/db/addData', (req, res) => {
  const data = req.body
  db.remove({}, {multi: true}, (err, doc) => {
    data.forEach((value, index) => {
      if(value.filePath !== '') {
        //base64デコード
        const decodedFile = new Buffer(value.filePath.replace(/^data:\w+\/\w+;base64,/, ''), 'base64')
        const contentType = value.filePath.toString().slice(value.filePath.indexOf(':') + 1, value.filePath.indexOf(';'))
        s3Upload(value.title, decodedFile, contentType)
        value.filePath = ''
      }
      db.insert(value, (err, doc) => {})
    })
  })
  res.send('登録完了')
});

app.get('/db/getData', (req, res) => {
  //dbをフォーマットするためにインスタンス生成し直す
  // db = new NeDB({
  //   filename: path.join(__dirname, 'db/mirai.db'),
  //   autoload: true
  // })

  if (req.url.indexOf('/getData?id') !== -1) {
    const id = url.parse(req.url, true).query.id
    db.findOne({ '_id' : parseInt(id) }, (err, docs) => {
      res.send(docs);
    })
  } else if (req.url.indexOf('/getData?createYear') !== -1) {
    const createYear = url.parse(req.url, true).query.createYear
    db.find({ 'createYear' : createYear }, (err, docs) => {
      res.send(docs);
    })
  } else {
    db.find({}).sort({_id: 1}).exec((err, docs) => {
      res.send(docs);
    })
  }
});

function s3Upload(title, decodedFile, contentType ) {
  const params = {
    Bucket: 'mrble-portfolio',
    Key: 'img/'+ title,
    Body: decodedFile,
    ContentType: contentType
  }

  s3.putObject(params, function(err, data) {
    if (err) {
      console.log(err, err.stack)
    } else {
      console.log(data);
    }
  });
}

async function getFileName(name) {
  return new Promise((resolve) => {

    const params2 = {
      Bucket: 'mrble-portfolio',
      Prefix: 'purichan/' + name
    }

    s3.listObjectsV2(params2, (err, data) => {
      if (err) {
        console.log("Error", err)
        resolve('Error')
      } else {
        const fileList = data.Contents
        fileList.shift()
        resolve(fileList[Math.floor(Math.random() * fileList.length )].Key)
      }
    })
  })
}

app.get('/getFileName', (req, res) => {
  const name = req.query.name
  let filePath
  switch(name) {
    case 'mirai':
    case 'emo':
    case 'rinka':
      getFileName(name).then((result) => {
        res.send(result)
      })
    break
    default:
      res.send('存在しないリクエスト')
      break
  }
})

module.exports = {
  path: '/api',
  handler: app,
}
