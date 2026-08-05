export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  if (!expenses.length) {
    return <div className="empty">No expenses found. Add your first expense.</div>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.category}</td>
              <td>₹{Number(expense.amount).toFixed(2)}</td>
              <td>{new Date(expense.createdAt).toLocaleString()}</td>
              <td>{new Date(expense.updatedAt).toLocaleString()}</td>
              <td>{expense.comments || "-"}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(expense)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(expense._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
