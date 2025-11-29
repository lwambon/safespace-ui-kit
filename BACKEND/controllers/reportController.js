const { createReport, getReports } = require('../models/reportModel');

const createReportController = async (req, res) => {
  try {
    const report = await createReport({ ...req.body, userId: req.user.id });
    res.status(201).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create report' });
  }
};

const getReportsController = async (req, res) => {
  try {
    const reports = await getReports();
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

module.exports = { createReport: createReportController, getReports: getReportsController };