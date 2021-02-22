const express = require('express');
const router = express.Router();

const { getEvenings, createEvening } = require('../modules/evenings');

router.all('/', (req, res, next) => {
  console.log('EVENINGS');
  next();
});

router.get('/', async (req, res) => {
  const evenings = await getEvenings();

  res.status(200);
  res.send(evenings);
});

router.post('/', async (req, res) => {
  await createEvening(req.body);

  res.status(201);
  res.end();
});

module.exports = router;
