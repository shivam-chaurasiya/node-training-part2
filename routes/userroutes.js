const express = require('express');
const router = express.Router();
const {userget,
    usergetbyId,
    userpost,
    userdelete,
    userput} =require('../controllers/usercontroller');

const checkauth = require('../middleware/usermid');

router.get('/',userget);

router.get('/:id',checkauth,usergetbyId);

router.post('/', userpost);
 
router.delete('/:id' ,userdelete);

router.put('/:id' , userput);



module.exports = router;