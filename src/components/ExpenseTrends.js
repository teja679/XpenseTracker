import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ComposedChart, ResponsiveContainer } from 'recharts';

function ExpenseTrends({ expenses }) {
  const data = expenses.reduce((acc, expense) => {
    const categoryIndex = acc.findIndex(item => item.name === expense.category);
    if (categoryIndex !== -1) {
      acc[categoryIndex].value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  return (
    <div className="expense-trends">
      <h3>Top Expenses</h3>
      <ResponsiveContainer width="100%" height={300} style={{backgroundColor:'#fff', borderRadius:'10px'}}>
        <ComposedChart
          layout="vertical"
          data={data}
          margin={{
            top: 20,
            right: 30,
            bottom: 20,
            left: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" style={{ fontSize: '0.8rem' }} />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="value" barSize={30} fill="#413ea0" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseTrends;






// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ComposedChart, ResponsiveContainer } from 'recharts';

// function ExpenseTrends({ expenses }) {
//   const data = expenses.reduce((acc, expense) => {
//     const categoryIndex = acc.findIndex(item => item.name === expense.category);
//     if (categoryIndex !== -1) {
//       acc[categoryIndex].value += expense.amount;
//     } else {
//       acc.push({ name: expense.category, value: expense.amount });
//     }
//     return acc;
//   }, []);

//   return (
//     <div className="expense-trends">
//       <h3>Top Expenses</h3>
//       <ResponsiveContainer height={300} style={{ width: 'fit-content', backgroundColor: 'white', borderRadius: '10px' }}> {/* Increased height */}
//         <ComposedChart
//           layout="vertical"
//           data={data}
//           margin={{
//             top: 20,
//             right: 40,
//             bottom: 20,
//             left: 20,
//           }}
//         >
//           {/* <CartesianGrid stroke="#f5f5f5" /> */}
//           {/* <BarChart width={500} height={300} data={data}> */}
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="value" barSize={30} fill="#413ea0" />
//           {/* </BarChart> */}
//         </ComposedChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default ExpenseTrends;