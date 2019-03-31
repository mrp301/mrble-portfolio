//参考
//https://photo-tea.com/p/aws-s3-upload-image/

// const s3 = require('s3');
// const client = s3.createClient({
//   maxAsyncS3: 20,
//   s3RetryCount: 3,
//   s3RetryDelay: 1000,
//   multipartUploadThreshold: 20971520,
//   multipartUploadSize: 15728640,
//   s3Options: {
//     accessKeyId: '',
//     secretAccessKey: '',
//   },
// });
//const config = require('/api/config.json');
//const aws = require('aws-sdk');
//console.log(config)
// aws.config.loadFromPath('/api/config.json')
// aws.config.update({region: 'ap-northeast-1'});
// const s3 = new aws.S3();

function s3Upload(title, path) {
  console.log("きてる？2")
  console.log(path)

  const params = {
    Bucket: 'mrble-portfolio',
    Key: 'img/'+ title,
    Body: path,
    ContentType: 'image/jpeg'
  }

  const s3 = new aws.S3();
  console.log("きてる？22")
  s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
  });
  console.log("done!")
}
  //
  // var data = {
  //  Key: 'img/'+ title,
  //  Body: path,
  //  ContentEncoding: 'base64',
  //  ContentType: 'image/jpeg'
  // };
  // s3Bucket.putObject(data, function(err, data) {
  //    if (err) {
  //      console.log(err);
  //      console.log('Error uploading data: ', data);
  //    } else {
  //      console.log('succesfully uploaded the image!');
  //    }
  // });

//
// function s3Upload(title, path) {
//   console.log("きてる？2")
//   //const fileName ToDo：うまいことファイル分割して名前だけ切り出す
//   // 続いてアップロードしたいファイルの指定や、S3にアップロードした時のファイル名をparamsで指定
//   const params = {
//     localFile: path, // アップロードしたいローカルのファイルパス。例では150x150.pngとした。パスは作成したプロジェクトルートからの相対パス
//     s3Params: {
//       Bucket: 'mrble-portfolio',  // アップロードしたいS3のバケット名
//       Key: 'img/'+ title, // アップロードした時に作成されるファイル名(S3バケットの相対パス)
//       ContentEncoding: 'base64',
//       ContentType: 'image/jpeg'
//     },
//   };
//
//   s3Bucket.putObject(data, function(err, data){
//      if (err) {
//        console.log(err);
//        console.log('Error uploading data: ', data);
//      } else {
//        console.log('succesfully uploaded the image!');
//      }
//   });
  // console.log("きてる？3")
  // console.log(params)
  // const uploader = client.uploadFile(params);
  // uploader.on('error', function(err) {
  //   console.error("unable to upload:", err.stack);
  // });
  // console.log("きてる？4")
  // uploader.on('progress', function() {
  //   console.log("progress", uploader.progressMd5Amount,
  //   uploader.progressAmount, uploader.progressTotal);
  // });
  // console.log("きてる？5")
  // uploader.on('end', function() {
  //   console.log("done uploading");
  // });
// }

module.exports = {
  's3Upload': s3Upload
}
