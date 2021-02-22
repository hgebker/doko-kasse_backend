const express = require('express');
const router = express.Router();

const { getSemesterReport, getCashReport } = require('../modules/reports');

const getTableName = req => req.apiGateway.event.stageVariables.tableName || 'evenings-dev';

router.all('/', (req, res, next) => {
  console.log('REPORTS');
  next();
});

router.get('/semester', async (req, res) => {
  const report = await getSemesterReport(getTableName(req), req.query.semester);

  if (report) {
    res.status(200).send(report);
  } else {
    res.status(204).end();
  }
});

router.get('/cash', async (req, res) => {
  const cashReport = await getCashReport(getTableName(req));

  if (cashReport) {
    res.status(200).send(cashReport);
  } else {
    res.status(204).end();
  }
});

module.exports = router;
