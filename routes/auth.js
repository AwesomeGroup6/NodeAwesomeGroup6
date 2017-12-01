const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.send('You cant login 😱');
});

router.post('/hello', function(req, res, next){
    console.dir(req.user);
    res.status(200).send('auth fam');
});

module.exports = router;
