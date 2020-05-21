const express = require('express');
const {
    signup, 
    signin, 
    signout
} = require('../controller/auth')
const {userPostValidator} = require('../validator');

const router = express.Router();

router.post('/signup', userPostValidator, signup);

router.post('/signin', signin);

router.get('/signout', signout);

module.exports = router;
