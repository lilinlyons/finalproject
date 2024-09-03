const { db } = require("../config/db.js");
const bcrypt = require('bcrypt');

async function cryptPwd(userPassword) {
    const saltRounds = 10;
    try {
        return await bcrypt.hash(userPassword, saltRounds);
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
}

const _registerUser = async (username, password) => {
    try {
        console.log("Inserting user...");
        const hashedPassword = await cryptPwd(password);

        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,}$/;
        const usernameRegex = /^(?=.*[A-Z])[A-Za-z]{5,}$/;

        if (!passwordRegex.test(password)) {
            throw new Error('Password must be at least 5 characters long and contain at least one special character.');

        }

        if (!usernameRegex.test(username)) {
            throw new Error('Username must be at least 5 characters with one uppercase letter.');
        }

        const existingUser = await db('ora_users').where({ username }).first();
        if (existingUser) {
            throw new Error('Username already exists');
        }

        const [newUser] = await db('ora_users').insert(
            { username, password: hashedPassword },
            ["id", "username", "password"]
        );

        return newUser;
    } catch (err) {
        console.error('Error registering user:', err);
        throw err;
    }
};

const _registerEmailAlerts = async (name, email) => {
    try {
        console.log("Inserting email...");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email address format.:', email);
        }

        const existingUser = await db('ora_email_subscription').where({ email }).first();
        if (existingUser) {
            throw new Error('Email address already subscribed');
        }

        const [newUser] = await db('ora_email_subscription').insert(
            { name, email},
            ["id", "name", "email"]
        );
        console.log("Email subscription successful.")
        return newUser;
    } catch (err) {
        console.error('Error subscribing email:', err);
        throw err;
    }
};


const _login = async (username, password) => {
    try {
        const user = await db('ora_users').where({ username }).first();
        if (!user) {
            console.log('User not found');
            return false;
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            console.log('Login successful');
            return true;
        } else {
            console.log('Password does not match');
            return false;
        }
    } catch (err) {
        console.error('Error logging in:', err);
        throw err; // Re-throwing the error to be handled by the calling code
    }
};

// Function to get all users
const _getAllUsers = () => {
    return db('ora_users').select('username');
};

// Function to get a single user by ID
const _getOneUser = (user_id) => {
    return db("ora_users")
        .select("id", "username", "password")
        .where({ id: user_id }).first(); // Added `.first()` to ensure single user retrieval
};

const _updateUser = async (user_id, username, password) => {
    try {
        const hashedPassword = await cryptPwd(password);
        return db("ora_users")
            .where({ id: user_id })
            .update({ username, password: hashedPassword }, ["id", "username", "password"]);
    } catch (err) {
        console.error('Error updating user:', err);
        throw err; // Re-throwing the error to be handled by the calling code
    }
};


module.exports = {
    _registerUser,
    _login,
    _getAllUsers,
    _getOneUser,
    _updateUser,
    _registerEmailAlerts
};