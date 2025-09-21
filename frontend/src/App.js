import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://personal-finance-tracker-backend-yhi2.onrender.com";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${API_URL}/transactions/`);
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Add or Edit transaction
  const submitTransaction = async () => {
    if (!description || !amount) return;

    if (editingId) {
      // For simplicity, we delete and re-add as backend doesn't have update yet
      await axios.delete(`${API_URL}/transactions/${editingId}`);
      setEditingId(null);
    }

    try {
      const res = await axios.post(`${API_URL}/transactions/`, {
        description,
        amount: parseFloat(amount),
      });
      setTransactions(transactions.filter(t => t.id !== editingId).concat(res.data));
      setDescription("");
      setAmount("");
    } catch (err) {
      console.error("Failed to submit transaction:", err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/transactions/${id}`);
      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete transaction:", err);
    }
  };

  const editTransaction = (t) => {
    setDescription(t.description);
    setAmount(t.amount);
    setEditingId(t.id);
  };

  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="App">
      <h1>Finance Tracker</h1>
      <h2>Balance: ${balance.toFixed(2)}</h2>

      <div className="transaction-form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={submitTransaction}>
          {editingId ? "Update Transaction" : "Add Transaction"}
        </button>
      </div>

      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((t) => (
            <li
              key={t.id}
              className={t.amount >= 0 ? "income" : "expense"}
            >
              <span>
                {t.description}: ${t.amount.toFixed(2)}
              </span>
              <div className="buttons">
                <button onClick={() => editTransaction(t)}>Edit</button>
                <button onClick={() => deleteTransaction(t.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
