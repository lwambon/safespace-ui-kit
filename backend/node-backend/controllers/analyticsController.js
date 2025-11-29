const { logEvent, getLogs } = require('../models/analyticsModel');

const logEventController = async (req, res) => {
  try {
    const event = await logEvent(req.body);
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log event' });
  }
};

const getLogsController = async (req, res) => {
  try {
    const logs = await getLogs();
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};

module.exports = { logEvent: logEventController, getLogs: getLogsController };