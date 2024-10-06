import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSnackbar } from 'notistack';
import './styles.css'
import { Avatar } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import AttractionsOutlinedIcon from '@mui/icons-material/AttractionsOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PaginatedList from './PaginatedList';
Modal.setAppElement('#root');
export const iconsList = {
	Food: <LocalPizzaOutlinedIcon />,
	Entertainment: <AttractionsOutlinedIcon />,
	Travel: <CardTravelOutlinedIcon />,
	others: <CategoryOutlinedIcon />
}
function ExpenseList({ expenses, setExpenses, walletBalance, setWalletBalance, setTotalExpense }) {
	const { enqueueSnackbar } = useSnackbar();
	const enqueueSnackbarStyles = {
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'center'
		}
	};
	// State for modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editExpense, setEditExpense] = useState(null);
	const [editedTitle, setEditedTitle] = useState('');
	const [editedAmount, setEditedAmount] = useState('');
	const [editedCategory, setEditedCategory] = useState('');

	const openModal = (expense) => {
		setEditExpense(expense);
		setEditedTitle(expense.title);
		setEditedAmount(expense.amount);
		setEditedCategory(expense.category);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditExpense(null);
	};

	const handleSaveEdit = () => {
		if (!editedTitle || !editedAmount || !editedCategory) {
			enqueueSnackbar('Please fill in all fields.', { variant: 'warning' }, {
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center'
				}
			});
			return;
		}

		const updatedExpenses = expenses.map((expense) =>
			expense.id === editExpense.id
				? { ...expense, title: editedTitle, amount: parseInt(editedAmount), category: editedCategory }
				: expense
		);

		const differenceInAmount = editExpense.amount - parseInt(editedAmount);
		setWalletBalance(walletBalance + differenceInAmount);  // Adjust the wallet balance

		setExpenses(updatedExpenses);
		closeModal();
		enqueueSnackbar('Expense updated successfully!', { variant: 'success' }, {
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'center'
			}
		});
	};

	const handleDeleteExpense = (id, amount) => {
		setExpenses(expenses.filter(expense => expense.id !== id));
		setWalletBalance(walletBalance + amount);
		setTotalExpense(prev => prev - amount)
		enqueueSnackbar('Expense deleted.', { variant: 'success' }, {
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'center'
			}
		});
	};

	return (
		<div className="expense-list">
			<h3>Recent Transactions</h3>
			<ul className='transactions-list'>
				{expenses && expenses.length > 0 ?
					<PaginatedList itemsPerPage={4} items={expenses} handleDeleteExpense={handleDeleteExpense} openModal={openModal} />
					: <div>
						<h4>No transaction available</h4>
					</div>}
			</ul>

			{/* Modal for Editing Expense */}
			<Modal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				contentLabel="Edit Expense"
				className="expense-modal"
				overlayClassName="expense-overlay"
			>
				<h2>Edit Expense</h2>
				<input
					type="text"
					value={editedTitle}
					onChange={(e) => setEditedTitle(e.target.value)}
					placeholder="Expense Title"
				/>
				<input
					type="number"
					value={editedAmount}
					onChange={(e) => setEditedAmount(e.target.value)}
					placeholder="Amount"
				/>
				<input
					type="text"
					value={editedCategory}
					onChange={(e) => setEditedCategory(e.target.value)}
					placeholder="Category"
				/>
				<div className="modal-actions">
					<button onClick={handleSaveEdit}>Edit Expense</button>
					<button onClick={closeModal}>Cancel</button>
				</div>
			</Modal>
		</div>
	);
}

export default ExpenseList;

{/* {expenses.map(expense => (
	<li key={expense.id}>
		<div className='title-div'>

			<Avatar>
				{iconsList[expense.category] ? iconsList[expense.category] : iconsList['others']}
			</Avatar>
			<div className='text-div'>
				<p className='text-title'>{expense.title}</p>
				<p className='text-date'>{expense.date}</p>
			</div>
		</div>
		<div className='btns-div'>
			<p className='text-amount'>
				₹{expense.amount}
			</p>
			<button className='delete-btn' onClick={() => handleDeleteExpense(expense.id, expense.amount)}>
				<HighlightOffOutlinedIcon />
			</button>
			<button className='edit-btn' onClick={() => openModal(expense)}>
				<ModeEditOutlineOutlinedIcon />
			</button>
		</div>
	</li>
))} */}