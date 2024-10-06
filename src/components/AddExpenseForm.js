import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import Modal from 'react-modal';

function AddExpenseForm({ setExpenses, walletBalance, setWalletBalance, totalExpense,setTotalExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const categoryList = [
    { name: "Food", expense: 0 },
    { name: "Entertainment", expense: 0 },
    { name: "Travel", expense: 0 }
  ];

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    resetFormFields(); // Reset form when modal closes
  };

  const resetFormFields = () => {
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  const handleAddExpense = () => {
    if (!title || !amount || !category || !date) {
      enqueueSnackbar('Please fill in all fields.', { variant: 'warning' });
      return;
    }

    const expenseAmount = parseInt(amount);

    if ((expenseAmount) > walletBalance) {
      enqueueSnackbar('Not enough balance.', { variant: 'error' });
      return;
    }

    const newExpense = {
      id: uuidv4(),
      title,
      amount: expenseAmount,
      category,
      date: new Date(date).toLocaleDateString(),
    };

    setExpenses((prev) => [...prev, newExpense]);
    setTotalExpense((prev) => prev + newExpense.amount);
    setWalletBalance(walletBalance - newExpense.amount);

    enqueueSnackbar('Expense added successfully!', { variant: 'success' });
    closeModal();
  };

  return (
    <div className="add-expense-form">
      <h2>Expenses: <span>₹{totalExpense}</span></h2>
      <button onClick={openModal}>+ Add Expense</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Expense Modal"
        className="custom-modal-style"
        overlayClassName="custom-overlay-style"
      >
        <h2>Add Expense</h2>
        <div className='input-div'>
          <input
            className='modal-input'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            className='modal-input'
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <select
            className='modal-input'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value='' disabled>Select Category</option>
            {categoryList.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            className='modal-input'
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="dd/mm/yyyy"
          />
          <button className='modal-add-button' onClick={handleAddExpense}>
            Add Expense
          </button>
          <button className='modal-cancel-button' onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default AddExpenseForm;
