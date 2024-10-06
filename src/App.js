import React, { useState, useEffect } from 'react';

import './App.css';
import WalletBalance from './components/WalletBalance';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseTrends from './components/ExpenseTrends';

function App() {
  const [walletBalance, setWalletBalance] = useState(() => {
    return JSON.parse(localStorage.getItem('walletBalance')) || 5000;
  });
  const [totalExpense, setTotalExpense] = useState(() => {
    return JSON.parse(localStorage.getItem('walletBalance')) || 0;
  });

  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem('expenses')) || [];
  });

  useEffect(() => {
    localStorage.setItem('walletBalance', JSON.stringify(walletBalance));
    localStorage.setItem('totalExpense', JSON.stringify(totalExpense));
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [walletBalance, expenses]);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <div className='top-div'>
        <WalletBalance walletBalance={walletBalance} setWalletBalance={setWalletBalance} />
        <AddExpenseForm setExpenses={setExpenses} walletBalance={walletBalance} setWalletBalance={setWalletBalance} totalExpense={totalExpense} setTotalExpense={setTotalExpense} />
        <ExpenseSummary expenses={expenses} />
      </div>
      <div className='bottom-div'>
        <div className='item-1'>
          <ExpenseList expenses={expenses} setExpenses={setExpenses} walletBalance={walletBalance} setWalletBalance={setWalletBalance} setTotalExpense={setTotalExpense} />
        </div>
        <div className='item-2'>
          <ExpenseTrends expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default App;
