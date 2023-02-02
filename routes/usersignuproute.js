const express = require('express');
const router1 = express.Router();
//const checkauth = require('../middleware/usermid');

const {userlopost,
       userloginpost} = require('../controllers/usersignupcontroller');

router1.post('/signup',  userlopost);

router1.post('/login',userloginpost);

module.exports = router1;