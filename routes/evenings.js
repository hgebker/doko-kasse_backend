const express = require('express');
const router = express.Router();

const {
  getEvenings,
  createEvening,
  updateEveningwithDate,
  deleteEveningWithDate,
  getEveningWithDate,
} = require('../modules/evenings');

const getTableName = req => req.apiGateway.event.stageVariables.tableName || 'evenings-dev';

router.all('/', (req, res, next) => {
  console.log('EVENINGS');
  next();
});

router.get('/:date', async (req, res) => {
  const evening = await getEveningWithDate(getTableName(req), req.params.date);

  if (evening) {
    res.status(200).send(evening);
  } else {
    res.status(204).end();
  }
});

router.get('/', async (req, res) => {
  const evenings = await getEvenings(getTableName(req), req.query.semester);

  res.status(200).send(evenings);
});

router.post('/', async (req, res) => {
  await createEvening(getTableName(req), req.body);

  res.status(201).end();
});

router.put('/:date', async (req, res) => {
  await updateEveningwithDate(getTableName(req), req.params.date, req.body);

  res.status(204).end();
});

router.delete('/:date', async (req, res) => {
  await deleteEveningWithDate(getTableName(req), req.params.date);

  res.status(204).end();
});

module.exports = router;
