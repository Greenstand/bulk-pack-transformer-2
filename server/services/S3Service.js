const s3 = require('../infra/aws/s3');

const uploadTrack = async (track, bulkPackFileName) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    ContentType: 'application/json',
    Key: `${bulkPackFileName}_${new Date().toISOString()}`,
    Body: JSON.stringify(track),
    ACL: 'private',
  };

  const uploadPromise = s3.upload(params).promise();
  return uploadPromise;
};

module.exports = {
  uploadTrack,
};
