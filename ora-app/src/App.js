// // app.js
//
// const express = require('express');
// const app = express();
// const port = 3000;
// const cookieParser = require('cookie-parser');
//
// const authMiddleware = require('./authMiddleware');
//
// // const router = require('./controllers/reg.controller');
// const {getAllUsers, registerUser} = require("./controllers/reg.controller");
//
// app.use(router)
//
// app.use(express.json());
// app.use(cookieParser());
//
// app.post("/register", registerUser);
//
// app.get("/getusers", getAllUsers);
//
// app.get('/', (req, res) => {
//   res.send('Hello, JWT Authentication!');
// });
//
//
// app.get('/profile', authMiddleware, (req, res) => {
//   // Access the authenticated user's information via req.user
//   res.json({ message: `Welcome, ${req.user.username}!` });
// });
//
//
//
// app.listen(process.env.PORT ||port, () => {
//   console.log(`Server is listening on port ${port}`);
// });