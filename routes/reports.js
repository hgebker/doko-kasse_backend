const express = require('express');
const router = express.Router();

const { getReport } = require('../modules/reports');

const getTableName = req => req.apiGateway.event.stageVariables.tableName || 'evenings-dev';

router.get('/', async (req, res) => {
  const report = await getReport(getTableName(req), req.query.semester);

  if (report) {
    res.status(200).send(report);
  } else {
    res.status(204).end();
  }
});

module.exports = router;
