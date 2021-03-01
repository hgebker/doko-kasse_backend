const express = require('express');
const router = express.Router();

const { getExpenses, createExpense, updateExpense, deleteExpenseWithKey } = require('../modules/expenses');

router.use((req, res, next) => {
  console.log('EXPENSES');
  next();
});

router.get('/', async (req, res) => {
  const expenses = await getExpenses(res.locals.expensesTable);

  res.status(200).send(expenses);
});

router.post('/', async (req, res) => {
  await createExpense(res.locals.expensesTable, req.body);

  res.status(201).end();
});

router.put('/', async (req, res) => {
  await updateExpense(res.locals.expensesTable, req.body);

  res.status(204).end();
});

router.delete('/:key', async (req, res) => {
  await deleteExpenseWithKey(res.locals.expensesTable, req.params.key);

  res.status(204).end();
});

module.exports = router;
