const axios = require('axios').default;

const config = require('../../config/config');

const Track = ({ locations, sessionId, key }) =>
  Object.freeze({
    locations,
    session_id: sessionId,
    bulk_pack_file_name: key,
  });

const createTrack = async (trackObject) => {
  const trackToCreate = Track(trackObject);

  // send data to the field-data-api
  await axios.post(`${config.treetrackerFieldDataUrl}/track`, trackToCreate);
};

module.exports = {
  createTrack,
  Track,
};
