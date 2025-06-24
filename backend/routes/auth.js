const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'mynotesismy3rdreactApp';

// Route-I: Create a user using : POST "/api/auth/createUser". Doesn't require Auth
router.post('/createUser', [
  body('email', 'Enter a valid email').isEmail(),
  body('name', 'Length of name should be >3').isLength({ min: 3 }),
  body('password', 'Length of password should be >6').isLength({ min: 6 })
], async (req, res) => {
  let success = false;
  // If there are errors, return them
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, erros: errors.array() });
  }
  // Check if user with this email already exists
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return (res.status(400).json({ success, errors: "Sorry user with this email already exists" }))
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)
    // Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    // .then(user => res.json(user)).catch(err =>{ console.log(err)
    //  res.json({error: 'Please enter unique email', message: err.message})
    // })

    const data = {
      id: user.id
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtData);
    // res.json(user)
    success = true;
    res.json({ success, authToken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error occured while creating user");
  }
})


// Route-II: Create a user using : POST "/api/auth/login". NO login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: " Invalid user credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: " Invalid user credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error occured while creating user");
  }
});

// Route-III: Logged in user details : POST "/api/auth/getUser". Login require
router.post('/getUser', fetchUser, async (req, res) => {

  try {
    userId = req.user.id;
    console.log(userId);
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error occured while creating user");
  }
});
module.exports = router;