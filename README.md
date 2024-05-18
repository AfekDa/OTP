## OTP - Afek David
OTP Project
This project is a simple One-Time Password (OTP) service built using React for the frontend and Node.js for the backend. The project also integrates with MySQL for data storage. The OTP service allows users to receive a one-time password via email and verify it through the application.

# Features
Send OTP: Users can enter their email address to receive an OTP.
Verify OTP: Users can enter the received OTP to verify their email.
Email Verification: The system checks if an email is already verified and prevents re-verification.
MySQL Integration: User data and OTP records are stored in a MySQL database.

# OTP Generation
The OTP is generated using weather data from three random cities. Here's how it works:

Fetch Weather Data: The backend uses the WeatherAPI to fetch the current temperature for three randomly selected cities.
Random City Selection: The random.city() function is used to select three random cities.
Format OTP: The temperatures are converted to positive numbers, and leading zeros are added to ensure each temperature is two digits long. The three temperatures are then concatenated to form a six-digit OTP.
For example, if the temperatures of the selected cities are 7°C, -12°C, and 33°C, the generated OTP would be 071233.

# Technologies Used
Frontend: React
Backend: Node.js, Express.js
Database: MySQL
Email Service: Nodemailer with Gmail
Setup Instructions
Prerequisites
Node.js
MySQL
Git


## Setup Instructions
Clone the Repository
Navigate to the backsrc directory
run "npm install"
add .env file

    PORT=3001
    APIKEY=your_weather_api_key
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASSWORD= email_app_password //  https://myaccount.google.com/apppasswords
    SQLPASS=your_mysql_password

Start the backend server
Navigate to the client directory
run "npm install"
start the server "npm start"

# Database
log in MySQL - 
mysql -u root -p

create the Database
CREATE DATABASE otp_project;
USE otp_project;
CREATE TABLE otp_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_valid BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE
);

## Usage
Open your browser and navigate to http://localhost:3000.
Enter your email to receive an OTP.
Check your email for the OTP.
# Note - Email might appear in spam folder
Enter the received OTP on the verification page.
