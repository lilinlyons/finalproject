const {
    _registerUser,
    _login,
    _getAllUsers,
    _getOneUser,
    _updateUser, _registerEmailAlerts
} = require("../models/reg.models");

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Username:', username);

        const newUser = await _registerUser(username, password);
        res.status(201).json(newUser);
    } catch (e) {
        console.error('Error in registerUser:', e);
        res.status(500).json({ message: e.message})
    }
};

const loginUser = (req, res) => {
    const { username, password } = req.body;
    _login(username, password)
        .then((result) => {
            if (result) {
                res.json({ message: "Login successful"});
            } else {
                res.status(401).json({ message: "Invalid username or password"});
            }
        })
        .catch((e) => {
            res.status(500).json({ message: "Internal Server Error", error: e.message });
        });
};


const getAllUsers = async (req, res) => {
    _getAllUsers()
        .then((result) => {
            res.json(result);
        })
        .catch((e) => {
            res.status(404).json({ message: "Error entering username and password" });
        });
};

const getOneUser = (req, res) => {
    const {id} = req.params
    _getOneUser(id)
        .then((result) => {
            res.json(result);
        })
        .catch((e) => {
            res.status(404).json({ message: "Error entering username and password" });
        });
};

const updateUser = (req, res) => {
    const {id} = req.params
    const {username, password} = req.body
    _User(id, username, password)
        .then((result) => {
            res.json(result);
        })
        .catch((e) => {
            res.status(404).json({ message: "Error entering username and password" });
        });
};

const emailAlerts = (req, res) => {
    const {name, email} = req.body
    _registerEmailAlerts(name, email)
        .then((result) => {
            res.json(result);
        })
        .catch((e) => {
            res.status(404).json({ message: e.message});
        });
};



module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getOneUser,
    updateUser,
    emailAlerts

}