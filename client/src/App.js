import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Portfolio from './components/Portfolio';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (token) {
            const fetchUserId = async () => {
                try {
                    const response = await axios.get('http://localhost:5001/api/users/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUserId(response.data.id);
                } catch (error) {
                    console.error('Error fetching user ID:', error);
                }
            };

            fetchUserId();
        }
    }, [token]);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={token ? <Navigate to="/portfolio" /> : <Login setToken={setToken} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/portfolio" element={token ? <Portfolio userId={userId} /> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
