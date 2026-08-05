const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses." });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const { category, amount, comments } = req.body;

    if (!category || amount === undefined || amount === "") {
      return res.status(400).json({ message: "Category and amount are required." });
    }

    const numericAmount = Number(amount);
    if (Number.isNaN(numericAmount) || numericAmount < 0) {
      return res.status(400).json({ message: "Amount must be a valid positive number." });
    }

    const expense = await Expense.create({
      user: req.userId,
      category,
      amount: numericAmount,
      comments: comments || ""
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Failed to create expense." });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { category, amount, comments } = req.body;

    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { category, amount: Number(amount), comments: comments || "" },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found." });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Failed to update expense." });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found." });
    }

    res.json({ message: "Expense deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete expense." });
  }
};
