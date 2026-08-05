import { useEffect, useState } from "react";

const initialState = {
  category: "",
  amount: "",
  comments: ""
};

export default function ExpenseForm({ editingExpense, onSave, onCancel }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingExpense) {
      setForm({
        category: editingExpense.category,
        amount: editingExpense.amount,
        comments: editingExpense.comments || ""
      });
    } else {
      setForm(initialState);
    }
  }, [editingExpense]);

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
    if (!editingExpense) setForm(initialState);
  };

  return (
    <form className="expense-form" onSubmit={submit}>
      <h2>{editingExpense ? "Edit Expense" : "Add Expense"}</h2>

      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
      >
        <option value="">Select Category</option>
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Education</option>
        <option>Health</option>
        <option>Entertainment</option>
        <option>Other</option>
      </select>

      <input
        type="number"
        min="0"
        step="0.01"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
      />

      <textarea
        placeholder="Comments (optional)"
        value={form.comments}
        onChange={(e) => setForm({ ...form, comments: e.target.value })}
        rows="3"
      />

      <div className="form-actions">
        <button className="primary-btn" type="submit">
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
        {editingExpense && (
          <button className="secondary-btn" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
