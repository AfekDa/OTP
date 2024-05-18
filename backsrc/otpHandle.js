const https = require('https');
var random = require('random-world');

function fetchTemperature(city) {
    return new Promise((resolve, reject) => {
        const apiKey = process.env.APIKEY;
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    if (response.current && response.current.temp_c) {
                        const temp = Math.round(response.current.temp_c);
                        resolve(temp);
                    } else {
                        reject(new Error(`Temperature data not found for ${city}`));
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function generateOTP() {
    const cities = [random.city(), random.city(), random.city()];
    let otp = '';
    try {
        for (const city of cities) {
            const temp = await fetchTemperature(city); // Assuming fetchTemperature returns a promise
            const tempStr = Math.abs(temp).toString().padStart(2, '0');
            otp += tempStr;
        }
        return otp;
    } catch (error) {
        console.error('Error generating OTP:', error);
        throw error; // Re-throw the error to be handled where generateOTP is called
    }
}

module.exports = {
    generateOTP
};
