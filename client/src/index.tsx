import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import Budget from './pages/Budget';
import AllAccounts from './pages/AllAccounts';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/budget' element={<Budget />} />
          <Route path='/accounts' element={<AllAccounts />} />
        </Routes>
      </Layout>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
