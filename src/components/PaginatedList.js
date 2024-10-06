import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { iconsList } from './ExpenseList';
import './styles.css'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Avatar } from '@mui/material';

const PaginatedList = ({ itemsPerPage, items, handleDeleteExpense, openModal }) => {

    // console.log(itemsPerPage, items)
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const getDisplayedItems = () => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return items.slice(startIndex, endIndex);
    };

    return (
        <>
            {getDisplayedItems().map(expense => (

                <li key={expense.id}>
                    <div className='title-div'>

                        <Avatar>
                            {iconsList[expense.category] ? iconsList[expense.category] : iconsList['others']}
                        </Avatar>
                        <div className='text-div'>
                            <p className='text-title'>{expense.title}</p>
                            <p className='text-date'>{new Date(expense.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: '2-digit' })}</p>
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
            ))}
            <Stack spacing={2} style={{ marginTop: '10px', width: '100%', position: 'absolute', bottom: '10px' }}>
                <Pagination style={{ margin: 'auto' }}
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
                    color="primary"
                />
            </Stack>
        </>
    );
};

// Usage Example:
// const items = [
//     'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',
//     'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10',
//     'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15'
// ];

// function App() {
//     return (
//         <div>
//             <h1>Paginated Items</h1>
//             <PaginatedList itemsPerPage={4} items={items} />
//         </div>
//     );
// }

export default PaginatedList;
