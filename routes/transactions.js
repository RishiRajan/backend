const router = require('express').Router();
const {
  addExpense,
  getExpense,
  deleteExpense,
  expenseByMonth,
} = require("../controllers/expense");
const {
  addIncome,
  getIncome,
  deleteIncome,
  incomeByMonth,
} = require("../controllers/income");
const { getAll } = require("../controllers/allTransactions");

router
  .post("/add-income", addIncome)
  .get("/get-income", getIncome)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", addExpense)
  .get("/get-expense", getExpense)
  .delete("/delete-expense/:id", deleteExpense)
  .get("/all", getAll)
  .get("/expensebymonth", expenseByMonth)
  .get("/incomebymonth", incomeByMonth);

module.exports =router