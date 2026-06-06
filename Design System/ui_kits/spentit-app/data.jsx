/* SpentIt UI kit — mock data (all local, mirrors the app's domain types). */

const CATEGORIES = {
  groceries:    { name: 'Groceries',     icon: 'groceries',     color: '#00d09c' },
  dining:       { name: 'Dining',        icon: 'dining',        color: '#f5a623' },
  transport:    { name: 'Transport',     icon: 'transport',     color: '#5c6bc0' },
  rent:         { name: 'Rent',          icon: 'rent',          color: '#6c63ff' },
  shopping:     { name: 'Shopping',      icon: 'shopping',      color: '#ec407a' },
  health:       { name: 'Health',        icon: 'health',        color: '#26a69a' },
  entertainment:{ name: 'Entertainment', icon: 'entertainment', color: '#7e57c2' },
  bills:        { name: 'Bills',         icon: 'bills',         color: '#42a5f5' },
  phone:        { name: 'Phone',         icon: 'phone',         color: '#5c6bc0' },
  salary:       { name: 'Salary',        icon: 'salary',        color: '#00d09c' },
};

const ACCOUNTS = [
  { id: 1, name: 'Cash',    icon: 'wallet',    color: '#00d09c', balance: 5400,  currency: 'INR' },
  { id: 2, name: 'HDFC',    icon: 'banknote',  color: '#5c6bc0', balance: 72180, currency: 'INR' },
  { id: 3, name: 'Card',    icon: 'receipt',   color: '#f5a623', balance: 6740,  currency: 'INR' },
];

// type, category key, amount, note, account, day label, time
const TXNS = [
  { id: 1,  type:'expense', cat:'groceries', amount:1240, note:'BigBasket order',  account:'HDFC', date:'Today',     time:'9:24 AM' },
  { id: 2,  type:'expense', cat:'dining',    amount:560,  note:'Blue Tokai',       account:'Card', date:'Today',     time:'8:10 AM' },
  { id: 3,  type:'expense', cat:'transport', amount:80,   note:'Metro',            account:'Cash', date:'Today',     time:'7:55 AM' },
  { id: 4,  type:'income',  cat:'salary',    amount:62000,note:'June salary',      account:'HDFC', date:'Yesterday', time:'10:00 AM' },
  { id: 5,  type:'expense', cat:'shopping',  amount:2399, note:'Running shoes',    account:'Card', date:'Yesterday', time:'6:30 PM' },
  { id: 6,  type:'expense', cat:'bills',     amount:899,  note:'Electricity',      account:'HDFC', date:'Yesterday', time:'2:15 PM' },
  { id: 7,  type:'expense', cat:'rent',      amount:18000,note:'Flat rent',        account:'HDFC', date:'3 Jun',     time:'11:00 AM' },
  { id: 8,  type:'expense', cat:'health',    amount:640,  note:'Pharmacy',         account:'Cash', date:'3 Jun',     time:'9:40 AM' },
  { id: 9,  type:'expense', cat:'entertainment', amount:499, note:'Cinema',        account:'Card', date:'2 Jun',     time:'8:00 PM' },
  { id: 10, type:'expense', cat:'phone',     amount:299,  note:'Recharge',         account:'HDFC', date:'2 Jun',     time:'1:20 PM' },
  { id: 11, type:'expense', cat:'groceries', amount:760,  note:'Vegetables',       account:'Cash', date:'1 Jun',     time:'5:30 PM' },
];

// Spending breakdown for the dashboard donut (this month)
const SPENDING = [
  { cat:'rent',      total:18000 },
  { cat:'groceries', total:8400 },
  { cat:'dining',    total:5600 },
  { cat:'shopping',  total:4399 },
  { cat:'bills',     total:3100 },
  { cat:'transport', total:1900 },
];

const BUDGETS = [
  { cat:'groceries', spent:8400,  limit:10000 },
  { cat:'dining',    spent:5600,  limit:6000 },
  { cat:'shopping',  spent:4399,  limit:4000 },
  { cat:'transport', spent:1900,  limit:3000 },
];

// 6-month expense bars for analytics
const MONTHLY = [
  { m:'Jan', v:41200 }, { m:'Feb', v:38600 }, { m:'Mar', v:45100 },
  { m:'Apr', v:39800 }, { m:'May', v:43900 }, { m:'Jun', v:41497 },
];

const SUMMARY = { income: 62000, expense: 41497, net: 20503, netWorth: 84320 };

window.SpentItData = { CATEGORIES, ACCOUNTS, TXNS, SPENDING, BUDGETS, MONTHLY, SUMMARY };
