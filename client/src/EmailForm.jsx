import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';

function EmailForm() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('Sending OTP...');  // Set a loading message
        try {
            const response = await fetch('http://localhost:3001/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) {
                if (data.message === 'Email is already verified') {
                    setMessage('Email is already verified.');
                } else {
                    setMessage('OTP sent successfully! Check your email.');
                    navigate('/verify-otp', { state: { email: email } });
                }
            } else {
                throw new Error(data.error || 'Failed to send OTP. Please try again.');
            }
        } catch (error) {
            setMessage('Error sending OTP. Please try again.');
            console.error('Error sending OTP:', error);
        } finally {
            setEmail(''); // Reset the email field after the form is submitted
        }
    };

    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <label className='emaillabel'>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                    required
                />
            </label>
            <button type="submit">Send OTP</button>
            {message && <p>{message}</p>}  
        </form>
    );
}

export default EmailForm;
