const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const loginRouter = express.Router();
const bcrypt = require('bcrypt');

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verify the provided username and password
    const user = await User.findOne({ email });

    const correctPassword = await bcrypt.compare(password, user.passwordHash);
    console.log(correctPassword);
    if (!(user && correctPassword )) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If credentials are valid, generate a token and send it in the response
    const token = jwt.sign({ userId: user._id }, 'your_secret_key'); // Replace 'your_secret_key' with a secure secret key

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = loginRouter;
