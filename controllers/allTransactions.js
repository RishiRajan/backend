const ExpenseSchema = require("../models/expense");
const IncomeSchema = require("../models/income");

exports.getAll = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ ceratedAT: -1 });
    const incomes = await IncomeSchema.find().sort({ ceratedAT: -1 });
    const data = [...expenses, ...incomes];

    data.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ messagge: "Server Error" });
  }
};
