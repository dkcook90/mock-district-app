const router = require('express').Router();
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const expiration = '1h'

router.get('/', async (req, res) => {
  try {
    const usersData = await User.findAll();
    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// allows users to sign up /api/users/signup POST
router.post('/signup', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.json({ token: jwt.sign({ email: userData.email, name: userData.name }, process.env.secret, { expiresIn: expiration })})
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email }});
      console.log(userData)
      if (!userData) {
        res.status(200).json({ message: 'Sorry, no user found with that email'})
      }
      if (userData.checkPassword(req.body.password)){
        return res.json({ token: jwt.sign({ email: userData.email, name: userData.name }, process.env.secret, { expiresIn: expiration })})
      }
      res.status(200).json({ message: 'Password is incorrect' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;