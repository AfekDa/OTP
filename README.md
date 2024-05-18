## OTP
OTP Project
This project is a simple One-Time Password (OTP) service built using React for the frontend and Node.js for the backend. The project also integrates with MySQL for data storage. The OTP service allows users to receive a one-time password via email and verify it through the application.

Features
Send OTP: Users can enter their email address to receive an OTP.
Verify OTP: Users can enter the received OTP to verify their email.
Email Verification: The system checks if an email is already verified and prevents re-verification.
MySQL Integration: User data and OTP records are stored in a MySQL database.
OTP Generation
The OTP is generated using weather data from three random cities. Here's how it works:

Fetch Weather Data: The backend uses the WeatherAPI to fetch the current temperature for three randomly selected cities.
Random City Selection: The random.city() function is used to select three random cities.
Format OTP: The temperatures are converted to positive numbers (if necessary), and leading zeros are added to ensure each temperature is two digits long. The three temperatures are then concatenated to form a six-digit OTP.
For example, if the temperatures of the selected cities are 7°C, 12°C, and 33°C, the generated OTP would be 071233.

Technologies Used
Frontend: React
Backend: Node.js, Express.js
Database: MySQL
Email Service: Nodemailer with Gmail
Setup Instructions
Prerequisites
Node.js
MySQL
Git
