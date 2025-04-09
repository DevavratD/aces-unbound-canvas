
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, PieChart as PieChartIcon, BarChart as BarChartIcon, LineChart, Filter } from 'lucide-react';

// Sample budget data
const budgetData = {
  totalBudget: 25000,
  allocated: 18500,
  remaining: 6500,
  categories: [
    { name: 'Events', value: 7500, color: '#8A2BE2' }, // Purple
    { name: 'Equipment', value: 4200, color: '#FF7F50' }, // Coral
    { name: 'Marketing', value: 2800, color: '#20B2AA' }, // Teal
    { name: 'Operations', value: 3000, color: '#DFFF00' }, // Neon
    { name: 'Miscellaneous', value: 1000, color: '#FF5733' }, // Orange
  ],
  monthlyExpenses: [
    { name: 'Jan', expenses: 1200 },
    { name: 'Feb', expenses: 1800 },
    { name: 'Mar', expenses: 2200 },
    { name: 'Apr', expenses: 1500 },
    { name: 'May', expenses: 2500 },
    { name: 'Jun', expenses: 2100 },
    { name: 'Jul', expenses: 1700 },
    { name: 'Aug', expenses: 1900 },
    { name: 'Sep', expenses: 2300 },
    { name: 'Oct', expenses: 2800 },
    { name: 'Nov', expenses: 0 },
    { name: 'Dec', expenses: 0 },
  ],
  recentTransactions: [
    { id: 1, description: 'Tech Conference Registration', amount: -1500, date: '2024-04-05', category: 'Events' },
    { id: 2, description: 'Member Dues Collection', amount: 2500, date: '2024-04-03', category: 'Income' },
    { id: 3, description: 'Equipment Purchase - Projector', amount: -800, date: '2024-04-01', category: 'Equipment' },
    { id: 4, description: 'Workshop Materials', amount: -350, date: '2024-03-28', category: 'Events' },
    { id: 5, description: 'Sponsorship - TechCorp', amount: 3000, date: '2024-03-25', category: 'Income' },
  ]
};

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-aces-darkblue p-3 rounded-lg border border-aces-purple/30 shadow-lg">
        <p className="text-white font-medium">{label}</p>
        <p className="text-aces-coral">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

const BudgetVisualizer: React.FC = () => {
  const [chartType, setChartType] = useState<'pie' | 'bar' | 'area'>('pie');
  
  // Calculate percentages
  const allocatedPercentage = (budgetData.allocated / budgetData.totalBudget) * 100;
  const remainingPercentage = (budgetData.remaining / budgetData.totalBudget) * 100;
  
  // Custom rendering for the pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text 
        x={x} 
        y={y} 
        fill="#ffffff" 
        textAnchor="middle" 
        dominantBaseline="central"
        className="text-xs"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <div className="py-16 px-4 relative">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-2">Budget Tracker</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Track, visualize, and manage financial resources effectively
          </p>
        </div>
        
        {/* Budget summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div 
            className="card-custom"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-display font-medium text-white">Total Budget</h3>
                <div className="p-2 bg-aces-purple/20 rounded-full">
                  <DollarSign className="h-5 w-5 text-aces-purple" />
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">${budgetData.totalBudget.toLocaleString()}</span>
              </div>
              <div className="flex items-center text-aces-coral text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>Annual allocation</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="card-custom"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-display font-medium text-white">Allocated</h3>
                <div className="p-2 bg-aces-coral/20 rounded-full">
                  <PieChartIcon className="h-5 w-5 text-aces-coral" />
                </div>
              </div>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white">${budgetData.allocated.toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-aces-darkblue/50 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-aces-coral to-aces-purple rounded-full"
                  style={{ width: `${allocatedPercentage}%` }}
                />
              </div>
              <div className="flex items-center text-aces-coral text-sm">
                <span>{allocatedPercentage.toFixed(1)}% of budget allocated</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="card-custom"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-display font-medium text-white">Remaining</h3>
                <div className="p-2 bg-aces-teal/20 rounded-full">
                  <TrendingDown className="h-5 w-5 text-aces-teal" />
                </div>
              </div>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white">${budgetData.remaining.toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-aces-darkblue/50 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-aces-teal to-aces-neon rounded-full"
                  style={{ width: `${remainingPercentage}%` }}
                />
              </div>
              <div className="flex items-center text-aces-teal text-sm">
                <span>{remainingPercentage.toFixed(1)}% of budget remaining</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Chart section */}
          <motion.div 
            className="lg:w-2/3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-custom">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h3 className="text-2xl font-display font-semibold text-white">Budget Breakdown</h3>
                  
                  <div className="flex items-center bg-aces-darkblue/40 rounded-lg overflow-hidden">
                    <button 
                      className={`px-3 py-2 flex items-center gap-1 text-sm ${
                        chartType === 'pie' 
                          ? 'bg-aces-purple text-white' 
                          : 'text-white/70 hover:text-white'
                      }`}
                      onClick={() => setChartType('pie')}
                    >
                      <PieChartIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Pie</span>
                    </button>
                    <button 
                      className={`px-3 py-2 flex items-center gap-1 text-sm ${
                        chartType === 'bar' 
                          ? 'bg-aces-purple text-white' 
                          : 'text-white/70 hover:text-white'
                      }`}
                      onClick={() => setChartType('bar')}
                    >
                      <BarChartIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Bar</span>
                    </button>
                    <button 
                      className={`px-3 py-2 flex items-center gap-1 text-sm ${
                        chartType === 'area' 
                          ? 'bg-aces-purple text-white' 
                          : 'text-white/70 hover:text-white'
                      }`}
                      onClick={() => setChartType('area')}
                    >
                      <LineChart className="h-4 w-4" />
                      <span className="hidden sm:inline">Area</span>
                    </button>
                  </div>
                </div>
                
                <div className="h-[400px] w-full">
                  {chartType === 'pie' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={budgetData.categories}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                          animationDuration={1000}
                        >
                          {budgetData.categories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend 
                          layout="horizontal" 
                          verticalAlign="bottom" 
                          align="center"
                          formatter={(value) => <span style={{ color: '#ffffff' }}>{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  
                  {chartType === 'bar' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={budgetData.categories}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="name" stroke="#ffffff80" />
                        <YAxis stroke="#ffffff80" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend 
                          formatter={(value) => <span style={{ color: '#ffffff' }}>{value}</span>}
                        />
                        <Bar dataKey="value" name="Amount" radius={[8, 8, 0, 0]}>
                          {budgetData.categories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                  
                  {chartType === 'area' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={budgetData.monthlyExpenses}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8A2BE2" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#ffffff80" />
                        <YAxis stroke="#ffffff80" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                          formatter={(value) => <span style={{ color: '#ffffff' }}>{value}</span>} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="expenses" 
                          name="Monthly Expenses"
                          stroke="#8A2BE2" 
                          fillOpacity={1} 
                          fill="url(#colorExpenses)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Transactions section */}
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="card-custom h-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-display font-semibold text-white">Recent Transactions</h3>
                  <button className="p-2 bg-aces-darkblue/60 hover:bg-aces-purple/20 rounded-lg transition-colors duration-200">
                    <Filter className="h-4 w-4 text-white/70" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {budgetData.recentTransactions.map((transaction) => (
                    <motion.div 
                      key={transaction.id}
                      className="bg-aces-darkblue/30 rounded-lg p-3 border border-white/5 hover:border-aces-purple/20 transition-colors duration-200"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-medium">{transaction.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-white/50">{transaction.date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1')}</span>
                            <span className="inline-block h-1 w-1 rounded-full bg-white/30"></span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-aces-darkblue/50 text-white/70">
                              {transaction.category}
                            </span>
                          </div>
                        </div>
                        <span className={`font-mono font-medium ${transaction.amount > 0 ? 'text-green-400' : 'text-aces-coral'}`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/10">
                  <button className="w-full py-3 bg-aces-darkblue/50 hover:bg-aces-purple/20 text-white font-medium rounded-lg transition-colors duration-200">
                    View All Transactions
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="blob-shape w-[700px] h-[700px] -bottom-[20%] -right-[20%] opacity-5 z-0" />
    </div>
  );
};

export default BudgetVisualizer;
