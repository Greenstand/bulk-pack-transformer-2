const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { default: axios } = require('axios');

chai.use(sinonChai);

const { expect } = chai;
const { Track, createTrack } = require('./Track');
const config = require('../../config/config');

describe('Track Model', () => {
  it('track Models should return defined fields', () => {
    const track = Track({});
    expect(track).to.have.keys([
      'locations',
      'session_id',
      'bulk_pack_file_name',
    ]);
  });

  it('should make a call to the track external API endpoint', async () => {
    const trackObject = {
      locations: [],
      sessionId: 'sessionId',
      key: 'file_name',
    };

    const axiosStub = sinon.stub(axios, 'post');
    const fieldDataUrlStub = sinon.stub(config, 'treetrackerFieldDataUrl');

    fieldDataUrlStub.get(() => 'trackUrl');
    await createTrack(trackObject);
    expect(axiosStub).calledWith('trackUrl/track', {
      locations: [],
      session_id: 'sessionId',
      bulk_pack_file_name: 'file_name',
    });
    axiosStub.restore();
    fieldDataUrlStub.restore();
  });
});
