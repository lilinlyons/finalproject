
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = express.Router();

// Sample user data (replace with a database in a real application)
const users = [];

const secretKey = 'mysecretkey';

// Middleware for parsing JSON requests
router.use(bodyParser.json());
router.use(cookieParser());
// Endpoint for user registration
router.post('/register', (req, res) => {

    const { username, password } = req.body;
    console.log('Request body:', req.body);
    console.log(req.body)
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,}$/;
    const usernameRegex = /^(?=.*[A-Z])[A-Za-z]{5,}$/;

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 5 characters long and contain at least one special character.' });
    }

    if (!usernameRegex.test(username)) {
        return res.status(400).json({ message: 'Username must be at least 5 characters with one uppercase letter.' });
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
    }

    // Generate JWT
    const token = jwt.sign({username: username }, secretKey, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ message: 'User registered successfully' });
});


router.post('/editprofile', (req, res) => {
    const { username, newusername, newpassword } = req.body;

    console.log('Request body:', req.body);

    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,}$/;
    const usernameRegex = /^(?=.*[A-Z])[A-Za-z]{5,}$/;

    if (newpassword && !passwordRegex.test(newpassword)) {
        return res.status(400).json({ message: 'New password must be at least 5 characters long and contain at least one special character.' });
    }

    if (newusername && !usernameRegex.test(newusername)) {
        return res.status(400).json({ message: 'New username must be at least 5 characters with one uppercase letter.' });
    }

    // Check if the new username is already taken (if provided)
    const existingUser = newusername ? users.find(user => user.username === newusername) : null;

    if (existingUser) {
        return res.status(409).json({ message: 'The new username already exists' });
    }

    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile details
    if (newusername) {
        user.username = newusername;
    }

    if (newpassword) {
        const hashedPassword = bcrypt.hashSync(newpassword, 10);
        user.password = hashedPassword;
    }

    // Create a new token
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    // Return success message
    return res.status(200).json({ message: 'Profile updated successfully' });
});


// Endpoint for user login
router.post('/login', (req, res) => {
    const { username, password } = req.body;


    // Find the user with the given username
    const user = users.find((u) => u.username === username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate an access token for the authenticated user
    const accessToken = jwt.sign({ username: user.username }, secretKey, {
        expiresIn: '1h', // Token expires in 1 hour
    });

    // Generate a refresh token with a longer expiration time
    const refreshToken = jwt.sign({ username: user.username }, secretKey, {
        expiresIn: '7d', // Refresh token expires in 7 days
    });

    // Set the access token as an HTTP cookie
    res.cookie('token', accessToken, { httpOnly: true });

    // Set the refresh token as an HTTP cookie
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    res.status(200).json({ message: 'Login successful' });
});


router.post('/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
    }

    jwt.verify(refreshToken, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Refresh token verification failed' });
        }

        // Generate a new access token
        const accessToken = jwt.sign({ id: user.id, username: user.username }, secretKey, {
            expiresIn: '1h', // New access token expires in 1 hour
        });

        // Set the new access token as an HTTP cookie
        res.cookie('token', accessToken, { httpOnly: true });

        res.status(200).json({ message: 'Token refreshed successfully' });
    });
});

// Endpoint for user logout
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;