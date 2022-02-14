import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Layout from './Layout/Layout';
import GroupChat from './pages/GroupChat';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Layout>
        <Routes>
            <Route>
                <Route path="/*" element={<App />} />
                <Route path="/Global" element={<GroupChat />} />
            </Route>
        </Routes>
      </Layout>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
