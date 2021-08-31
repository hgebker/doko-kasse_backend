import { Router } from 'express';
import { getEarnings, createEarning, updateEarning, deleteEarningWithKey } from '../modules/earnings';

const router = Router();

router.use((_req, _res, next) => {
  console.log('EARNINGS');
  next();
});

router.get('/', async (_req, res) => {
  const Earnings = await getEarnings(res.locals.earningsTable);

  res.status(200).send(Earnings);
});

router.post('/', async (req, res) => {
  await createEarning(res.locals.earningsTable, req.body);

  res.status(201).end();
});

router.put('/', async (req, res) => {
  await updateEarning(res.locals.earningsTable, req.body);

  res.status(204).end();
});

router.delete('/:key', async (req, res) => {
  await deleteEarningWithKey(res.locals.earningsTable, req.params.key);

  res.status(204).end();
});

export default router;
