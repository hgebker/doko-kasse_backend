const express = require('express');
const router = express.Router();

const { getExpenses, createExpense, updateExpenseWithKey, deleteExpenseWithKey } = require('../modules/expenses');

const getTableName = req => req.apiGateway.event.stageVariables.expensesTable || 'expenses-dev';

router.all('/', (req, res, next) => {
  console.log('EXPENSES');
  next();
});

router.get('/', async (req, res) => {
  const expenses = await getExpenses(getTableName(req));

  res.status(200).send(expenses);
});

router.post('/', async (req, res) => {
  await createExpense(getTableName(req), req.body);

  res.status(201).end();
});

router.put('/:key', async (req, res) => {
  await updateExpenseWithKey(getTableName(req), req.params.key, req.body);

  res.status(204).end();
});

router.delete('/:key', async (req, res) => {
  await deleteExpenseWithKey(getTableName(req), req.params.key);

  res.status(204).end();
});

module.exports = router;
