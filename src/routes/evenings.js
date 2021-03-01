const express = require('express');
const router = express.Router();

const {
  getEvenings,
  createEvening,
  updateEveningwithDate,
  deleteEveningWithDate,
  getEveningWithDate,
} = require('../modules/evenings');

router.use((req, res, next) => {
  console.log('EVENINGS');
  req.tableName = req.apiGateway.event.stageVariables.eveningsTable || 'evenings-dev';
  next();
});

router.get('/:date', async (req, res) => {
  const evening = await getEveningWithDate(req.tableName, req.params.date);

  if (evening) {
    res.status(200).send(evening);
  } else {
    res.status(204).end();
  }
});

router.get('/', async (req, res) => {
  const evenings = await getEvenings(req.tableName, req.query.semester);

  res.status(200).send(evenings);
});

router.post('/', async (req, res) => {
  await createEvening(req.tableName, req.body);

  res.status(201).end();
});

router.put('/:date', async (req, res) => {
  await updateEveningwithDate(req.tableName, req.params.date, req.body);

  res.status(204).end();
});

router.delete('/:date', async (req, res) => {
  await deleteEveningWithDate(req.tableName, req.params.date);

  res.status(204).end();
});

module.exports = router;
