const ExpenseSchema = require("../models/expense");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date, type } = req.body;
  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
    type,
  });

  try {
    // Validations
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).send({ message: "All fiels are required" });
    }
    if (amount <= 0 || amount === "number") {
      return res.status(400).send({ message: "Amount must be a valid number" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ ceratedAT: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ messagge: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);

  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "Expense deleted" });
      console.log("Expense deleted" + id);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.expenseByMonth = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.aggregate([
      {
        $project: {
          month: { $month: "$date" },
          amount: 1,
        },
      },
      {
        $group: {
          _id: { month: "$month" },
          total: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ messagge: "Server Error" });
  }
};
