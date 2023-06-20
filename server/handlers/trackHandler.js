const log = require('loglevel');

const { createTrack } = require('../models/Track');

const trackPost = async function (req, res, next) {
  log.log('/tracks');
  try {
    await createTrack(req.body);
    log.log('/tracks done');
    res.status(200).json();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  trackPost,
};
