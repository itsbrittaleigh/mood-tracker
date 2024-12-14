import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import Log from './pages/Log';
import History from './pages/History';
import './index.css';

const root = document.getElementById('root');
createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Log />} />
        <Route path="history" element={<History />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
