const axios = require('axios').default;

const config = require('../../config/config');
const { uploadTrack } = require('../services/S3Service');

const Track = ({ locations, sessionId, key }) =>
  Object.freeze({
    locations,
    session_id: sessionId,
    bulk_pack_file_name: key,
  });

const createTrack = async (trackObject) => {
  // not throwing an error so to prevent that bulk pack from being marked as failed
  if (!trackObject.sessionId) {
    return;
  }
  const track = Track(trackObject);

  // upload to s3, get track_link
  const result = await uploadTrack(
    trackObject.locations,
    track.bulk_pack_file_name,
  );

  // send data to the field-data-api
  await axios.post(`${config.treetrackerFieldDataUrl}/track`, {
    locations_url: result.Location,
    session_id: track.session_id,
    bulk_pack_file_name: track.bulk_pack_file_name,
  });
};

module.exports = {
  createTrack,
  Track,
};
