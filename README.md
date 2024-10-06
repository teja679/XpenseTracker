# Introduction

This is a simple and intuitive web application built with React.JS to help users manage and track their daily expenses. The user can add, edit, and delete expenses, track spending by category, view expense summaries, and visualize trends through charts. The wallet balance is automatically updated, and all data persists using localStorage.

## Features

### Wallet Balance Management:

- Default balance is set to ₹5000.
- Users can increase their wallet balance by adding income.
- Expenses are deducted from the wallet balance automatically.
- Users cannot spend more than their available balance (a warning is shown if they attempt to).
- Add/Edit/Delete Expenses:

- Users can add expenses with a title, amount, category, and date.
- The wallet balance is updated upon adding or deleting expenses.
- Users can also edit existing expenses.

### Expense Summary:

- Displays total expenses.
- Provides a summary categorized by type in a pie chart.

### Expense Trends:

- A bar chart showing the spending trends by category over time.

### Persistent Storage:

- All data (expenses and wallet balance) are stored in localStorage and persist across page refreshes.

### Responsive Design:

- The UI is fully responsive and works on different screen sizes, including mobile, tablet, and desktop.


## Technologies Used
- Frontend: React.JS, HTML, CSS, JavaScript
- Charts: Recharts (for visualizing expense summaries and trends)
- Modal: React-Modal (for adding and editing expenses)
- Notifications: Notistack (for success/error messages)
- Icons: React-Icons
- State Management: React Hooks (useState, useEffect)
- Local Storage: localStorage for data persistence
- Styling: Plain CSS for custom styling