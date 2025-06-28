import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts';

function Graph({ users, products, avilableProducts, orders,revenue }) {
  const graphData = [
    { name: 'Users', value: users, fill: '#28a745' },          
    { name: 'Products', value: products, fill: '#dc3545' },    
    { name: 'Available products', value: avilableProducts, fill: '#007bff' }, 
    { name: 'Orders', value: orders, fill: '#ffc107' }, 
    { name: 'revenue in thousands', value: revenue/1000, fill: '#ffc107' }        
  ];

  return (
    <div className="container my-4">
      <div className="card shadow-lg p-4">
        <h4 className="text-center text-primary mb-4">Dashboard Summary</h4>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                cursor={{ fill: 'rgba(0, 123, 255, 0.1)' }}
              />
              <Legend />
              <Bar dataKey="value">
                {graphData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Graph;
