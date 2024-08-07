const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

const correctPassword = '09871234'; // Set your password here

app.listen(8080, function() {
    console.log('Server is listening on port 8080');
});

// Serve the form HTML file
app.get('/req', function(req, res) {
    res.sendFile(path.join(__dirname, 'write.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the results password input HTML file
app.get('/results', function(req, res) {
    res.sendFile(path.join(__dirname, 'results.html'));
});

app.post('/submit', function(req, res) {
    const { nickname, roomLink, purpose } = req.body;
    const data = `방장 오픈프로필 닉네임: ${nickname}\n설치할 방의 링크: ${roomLink}\n설치할 목적: ${purpose}\n\n`;

    // Save the data to a file
    fs.appendFile('formData.txt', data, function(err) {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('Data saved to file');
        res.redirect('/results'); // Redirect to results page after submission
    });
});

// Verify password and redirect accordingly
app.post('/verify-password', function(req, res) {
    const { password } = req.body;
    if (password === correctPassword) {
        res.redirect('/show-results');
    } else {
        res.redirect('/');
    }
});

// Serve the saved data if password is correct
app.get('/show-results', function(req, res) {
    fs.readFile('formData.txt', 'utf8', function(err, data) {
        if (err) {
            console.error('Error reading data:', err);
            res.send('No data available.');
            return;
        }
        res.send(`<pre>${data}</pre>`);
    });
});
