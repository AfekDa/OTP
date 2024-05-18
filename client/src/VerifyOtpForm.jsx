import React, { useState } from "react";
import './form.css';
import { useLocation } from 'react-router-dom';

function VerifyOtpForm() {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const email = location.state?.email || ''; // Get email from location state or set default value

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, otp })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('OTP verified successfully!');
            } else {
                setMessage(data.error || 'Verification failed. Please try again.');
            }
        } catch (error) {
            setMessage('Error sending OTP. Please try again.');
            console.error('Error sending OTP:', error);
        } finally {
            setOtp(''); // Reset the OTP field after the form is submitted
        }
    };

    const handleOtpChange = (e) => {
        const value = e.target.value;
        if (value.length <= 6) {
            setOtp(value);
        }
    };

    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <label className='numberlabel'>
                Email: {email}
                <input
                    type="number"
                    value={otp}
                    onChange={handleOtpChange}
                    required
                />
            </label>
            <button type="submit">Submit</button>
            {message && <p>{message}</p>}  
        </form>
    );
}

export default VerifyOtpForm;
