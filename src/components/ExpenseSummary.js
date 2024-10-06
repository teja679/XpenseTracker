import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';



const COLORS = ["#8884d8", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

function ExpenseSummary({ expenses }) {
    const data = expenses.reduce((acc, expense) => {
        const categoryIndex = acc.findIndex(item => item.name === expense.category);
        if (categoryIndex !== -1) {
            acc[categoryIndex].value += expense.amount;
        } else {
            acc.push({ name: expense.category, value: expense.amount });
        }
        return acc;
    }, []);
    console.log('data', data)
    return (
        <div className="expense-summary">
            <PieChart width={250} height={250} style={{ Border: 'none' }}>
                <Pie
                    data={data}
                    // cx={200}
                    // cy={200}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend />
            </PieChart>
        </div>
    );
}

export default ExpenseSummary;

{/* <PieChart width={250} height={250}>
    <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
        fill="#8884d8" />
    <Tooltip />
</PieChart> */}