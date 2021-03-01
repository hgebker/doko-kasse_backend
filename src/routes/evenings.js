const express = require('express');
const router = express.Router();

const {
  getEvenings,
  createEvening,
  updateEvening,
  deleteEveningWithDate,
  getEveningWithDate,
} = require('../modules/evenings');

router.use((req, res, next) => {
  console.log('EVENINGS');
  next();
});

router.get('/:date', async (req, res) => {
  const evening = await getEveningWithDate(req.eveningsTable, req.params.date);

  if (evening) {
    res.status(200).send(evening);
  } else {
    res.status(204).end();
  }
});

router.get('/', async (req, res) => {
  const evenings = await getEvenings(req.eveningsTable, req.query.semester);

  res.status(200).send(evenings);
});

router.post('/', async (req, res) => {
  await createEvening(req.eveningsTable, req.body);

  res.status(201).end();
});

router.put('/', async (req, res) => {
  await updateEvening(req.eveningsTable, req.body);

  res.status(204).end();
});

router.delete('/:date', async (req, res) => {
  await deleteEveningWithDate(req.eveningsTable, req.params.date);

  res.status(204).end();
});

module.exports = router;
