import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseChart from "../components/ExpenseChart";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [error, setError] = useState("");

  const loadExpenses = async () => {
    try {
      const { data } = await api.get("/expenses");
      setExpenses(data);
    } catch (err) {
      if (err.response?.status === 401) logout();
      else setError(err.response?.data?.message || "Could not load expenses.");
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const total = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount), 0),
    [expenses]
  );

  const saveExpense = async (form) => {
    try {
      setError("");
      if (editingExpense) {
        await api.put(`/expenses/${editingExpense._id}`, form);
        setEditingExpense(null);
      } else {
        await api.post("/expenses", form);
      }
      await loadExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed.");
    }
  };

  const deleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    try {
      await api.delete(`/expenses/${id}`);
      await loadExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <header className="topbar">
        <div>
          <h1>Expense Tracker</h1>
          <p>Welcome, {user.name || "User"}</p>
        </div>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </header>

      <main className="content">
        {error && <div className="error">{error}</div>}

        <div className="summary-card">
          <span>Total Expenses</span>
          <strong>₹{total.toFixed(2)}</strong>
        </div>

        <div className="grid">
          <ExpenseForm
            editingExpense={editingExpense}
            onSave={saveExpense}
            onCancel={() => setEditingExpense(null)}
          />
          <ExpenseChart expenses={expenses} />
        </div>

        <section className="expenses-section">
          <h2>Recent Expenses</h2>
          <ExpenseTable
            expenses={expenses}
            onEdit={setEditingExpense}
            onDelete={deleteExpense}
          />
        </section>
      </main>
    </div>
  );
}
