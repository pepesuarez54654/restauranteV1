import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import AdminPage from './pages/AdminPage';

function RedirectToMenu() {
    useEffect(() => {
        window.location.href = '/menu.html';
    }, []);
    return null;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RedirectToMenu />} />
                <Route path="/menu/*" element={<RedirectToMenu />} />
                <Route path="/admin/*" element={<AdminPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
