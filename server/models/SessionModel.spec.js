const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { default: axios } = require('axios');

chai.use(sinonChai);

const { expect } = chai;
const { createSession, Session } = require('./SessionModel');
const config = require('../../config/config');

describe('Session Model', () => {
  it('Session Models should return defined fields', () => {
    const session = Session({});
    expect(session).to.have.keys([
      'id',
      'device_configuration_id',
      'originating_wallet_registration_id',
      'target_wallet',
      'check_in_photo_url',
      'track_url',
      'organization',
      'bulk_pack_file_name',
      'start_time'
    ]);
  });

  it('should make a call to the session external API endpoint', async () => {
    const sessionObject = {
      id: 'id',
      device_configuration_id: 'device_configuration_id',
      originating_wallet_registration_id: 'originating_wallet_registration_id',
      target_wallet: 'target_wallet',
      check_in_photo_url: 'check_in_photo_url',
      track_url: 'track_url',
      organization: 'organization',
      key: 'bulk_pack_file_name',
      start_time: new Date().toISOString(),
    };

    const axiosStub = sinon.stub(axios, 'post');
    const sessionUrlStub = sinon.stub(config, 'treetrackerFieldDataUrl');

    sessionUrlStub.get(() => 'sessionUrl');
    await createSession(sessionObject);
    delete sessionObject.key;
    expect(axiosStub).calledWith('sessionUrl/session', {
      ...sessionObject,
      bulk_pack_file_name: 'bulk_pack_file_name',
    });
    axiosStub.restore();
    sessionUrlStub.restore();
  });
});
