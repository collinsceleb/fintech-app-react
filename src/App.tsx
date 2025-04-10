import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Register from './pages/Register';
import './App.css'
import Login from "./pages/Login.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/register" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
