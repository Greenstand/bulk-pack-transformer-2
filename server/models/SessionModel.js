const axios = require('axios').default;

const config = require('../../config/config');

const Session = ({
  id,
  device_configuration_id,
  originating_wallet_registration_id,
  target_wallet,
  check_in_photo_url,
  track_url,
  organization,
  key,
  start_time,
}) =>
  Object.freeze({
    id,
    device_configuration_id,
    originating_wallet_registration_id,
    target_wallet,
    check_in_photo_url,
    track_url,
    organization,
    bulk_pack_file_name: key,
    start_time: new Date(start_time).toISOString(), // TEMPORARY FOR MOBILE FIX FOR TEST ENVIRONMENT
    bulk_pack_version: 'v2',
  });

const createSession = async (sessionObject) => {
  // post to the field-data microservice
  await axios.post(
    `${config.treetrackerFieldDataUrl}/session`,
    Session(sessionObject),
  );
};

module.exports = {
  createSession,
  Session,
};
