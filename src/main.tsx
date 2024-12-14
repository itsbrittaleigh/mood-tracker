import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import History from './pages/History';

const root = document.getElementById('root');
createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="history" element={<History />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
