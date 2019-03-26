//参考
//https://photo-tea.com/p/aws-s3-upload-image/

const s3 = require('s3');
const client = s3.createClient({
  maxAsyncS3: 20,     // デフォルトのままでOK
  s3RetryCount: 3,    // デフォルトのままでOK
  s3RetryDelay: 1000, // デフォルトのままでOK
  multipartUploadThreshold: 20971520, // デフォルトのままでOK
  multipartUploadSize: 15728640, // デフォルトのままでOK
  s3Options: {
    accessKeyId: '', // 今回S3にアクセスするために作成したIAMユーザーのアクセス
    secretAccessKey: '',  // 今回S3にアクセスするために作成したIAMユーザーのシークレット・キー
  },
});

function s3Upload(path) {
  //const fileName ToDo：うまいことファイル分割して名前だけ切り出す
  // 続いてアップロードしたいファイルの指定や、S3にアップロードした時のファイル名をparamsで指定
  const params = {
    localFile: path, // アップロードしたいローカルのファイルパス。例では150x150.pngとした。パスは作成したプロジェクトルートからの相対パス
    s3Params: {
      Bucket: 'mrble-portfolio',  // アップロードしたいS3のバケット名
      Key: 'img/'+ fileName, // アップロードした時に作成されるファイル名(S3バケットの相対パス)
    },
  };
  const uploader = client.uploadFile(params);
  uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount,
    uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done uploading");
  });
}

module.exports = {
  's3Upload': s3Upload
}
