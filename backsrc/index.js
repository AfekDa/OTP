const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config({ path: __dirname + '/.env' });

const { generateOTP } = require('./otpHandle');
const { sendEmail } = require('./emailHandle');

const app = express();


app.use(cors()); // Enable CORS 
app.use(express.json()); 

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.SQLPASS,
  database: "crud"
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to database with ID: ' + db.threadId);
});

// Route to generate and send OTP
app.get('/', async (req, res) => {
  try {
    const userEmail = 'afekdavid666@gmail.com';
    const otp = await generateOTP();
    console.log('OTP generated:', otp);
    await sendEmail(userEmail, otp);
    res.send('OTP sent successfully!');
  } catch (error) {
    console.error('Failed to generate or send OTP:', error);
    res.status(500).send('Failed to send OTP');
  }
});

app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const query = `SELECT * FROM otp_entries WHERE email = ? AND otp = ? AND is_valid = TRUE`;
    const [results] = await db.promise().query(query, [email, otp]);
    if (results.length > 0) {
      const updateQuery = `UPDATE otp_entries SET is_valid = FALSE, is_verified = TRUE WHERE id = ?`;
      await db.promise().query(updateQuery, [results[0].id]);
      res.json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ error: 'Invalid code, Please try again' });
    }
  } catch (err) {
    console.error('Failed to verify OTP:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  try {
    // Check if the email is already verified
    const checkQuery = `SELECT * FROM otp_entries WHERE email = ? AND is_verified = TRUE`;
    const [results] = await db.promise().query(checkQuery, [email]);
    if (results.length > 0) {
      return res.json({ message: 'Email is already verified' });
    }
    
    // Invalidate existing OTPs for this email
    const invalidateQuery = `UPDATE otp_entries SET is_valid = FALSE WHERE email = ? AND is_valid = TRUE`;
    await db.promise().query(invalidateQuery, [email]);
    
    // Generate new OTP
    const otp = await generateOTP();
    
    // Send OTP to email
    await sendEmail(email, otp);
    
    // Store new OTP in database
    const query = `INSERT INTO otp_entries (email, otp, is_valid, is_verified) VALUES (?, ?, TRUE, FALSE)`;
    await db.promise().query(query, [email, otp]);
    
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Failed to send OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP', details: error.message });
  }
});
const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
