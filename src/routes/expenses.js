const express = require('express');
const router = express.Router();

const { getExpenses, createExpense, updateExpense, deleteExpenseWithKey } = require('../modules/expenses');

router.use((req, res, next) => {
  console.log('EXPENSES');
  next();
});

router.get('/', async (req, res) => {
  const expenses = await getExpenses(req.expensesTable);

  res.status(200).send(expenses);
});

router.post('/', async (req, res) => {
  await createExpense(req.expensesTable, req.body);

  res.status(201).end();
});

router.put('/', async (req, res) => {
  await updateExpense(req.expensesTable, req.body);

  res.status(204).end();
});

router.delete('/:key', async (req, res) => {
  await deleteExpenseWithKey(req.expensesTable, req.params.key);

  res.status(204).end();
});

module.exports = router;
