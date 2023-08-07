const registerRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

registerRouter.get('/', async (request, response) => {
  try {
    const register = await User.find({});
    response.json(register);
  } catch (error) {
    console.log(error);
  }
});

registerRouter.post('/', async (request, response) => {
  const { username, email, password } = request.body;

  // Validation: Check if username is already in the database
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({ error: 'Username already exists' });
  }

  // Validation: Check if email is in valid format
  if (!/\S+@\S+\.\S+/.test(email)) {
    return response.status(400).json({ error: 'Invalid email format' });
  }

  // Validation: Check if password is strong enough
  if (password.length < 8) {
    return response.status(400).json({ error: 'Password should be at least 8 characters long' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const register = new User({ username, email, passwordHash });

  try {
    const registeredAccount = await register.save();
    if (registeredAccount._id) {
      return response.status(201).json(registeredAccount);
    } else {
      throw Error('Error creating user');
    }
  } catch (error) {
    console.log(error);
  }
});

registerRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id);

  response.status(204).end(); // 204 status means no content, return no data as it is deleted
});

registerRouter.delete('/', async (request, response) => {
  await User.deleteMany();

  response.status(204).end(); // 204 status means no content, return no data as it is deleted
});

module.exports = registerRouter;
