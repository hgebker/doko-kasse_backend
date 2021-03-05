import { Request, Router } from 'express';
import {
  getEvenings,
  createEvening,
  updateEvening,
  deleteEveningWithDate,
  getEveningWithDate,
} from '../modules/evenings';

interface Query {
  semester: string;
}

const router = Router();

router.use((_req, _res, next) => {
  console.log('EVENINGS');
  next();
});

router.get('/:date', async (req, res) => {
  const evening = await getEveningWithDate(res.locals.eveningsTable, req.params.date);

  if (evening) {
    res.status(200).send(evening);
  } else {
    res.status(204).end();
  }
});

router.get('/', async (req: Request<{}, {}, {}, Query>, res) => {
  const evenings = await getEvenings(res.locals.eveningsTable, req.query.semester);

  res.status(200).send(evenings);
});

router.post('/', async (req, res) => {
  await createEvening(res.locals.eveningsTable, req.body);

  res.status(201).end();
});

router.put('/', async (req, res) => {
  await updateEvening(res.locals.eveningsTable, req.body);

  res.status(204).end();
});

router.delete('/:date', async (req, res) => {
  await deleteEveningWithDate(res.locals.eveningsTable, req.params.date);

  res.status(204).end();
});

export default router;
