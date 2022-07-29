const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

/* 
POST - Register new user
*/
const createUser = asyncHandler(async (req, res) => {
  const { name, email, pwd } = req.body;

  // Check for fields
  if (!name || !email || !pwd) {
    res.status(400);
    throw new Error('New user must have name, email and password');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pwd, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/*
POST - Authenticate user
*/
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    });
  } else {
    res.status(403);
    throw new Error('Email or password is invalid');
  }

});

/*
GET - Current User Info
*/
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email
  });
});

/*
PUT - Update Current User
*/
const updateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for fields
  if (!email || !password) {
    res.status(400);
    throw new Error('To update user must have email and password');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(400);
    throw new Error('User does not exist');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.findOneAndUpdate({ email: email }, {
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    });
  } else {
    res.status(400);
    throw new Error('Unable to update user');
  }
});

/*
Generate JWT 
*/
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

module.exports = { createUser, loginUser, getUser, updateUser };