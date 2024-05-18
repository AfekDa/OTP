import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter and Routes
import './App.css';
import EmailForm from './EmailForm';
import VerifyOtpForm from './VerifyOtpForm';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to the OTP Service</h1>
                <Router>
                    <Routes>
                        <Route path="/" element={<EmailForm />} />
                        <Route path="/verify-otp" element={<VerifyOtpForm />} />
                    </Routes>
                </Router>
            </header>
        </div>
    );
}

export default App;
