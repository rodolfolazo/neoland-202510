const priceFeed = require("../services/priceFeed.service");

exports.streamPrices = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.flushHeaders();

  priceFeed.addClient(res);
};
