const express = require('express');
const router = express.Router();
const auth = require('authenticator');
const fs = require('fs');
let path = '../Authenticator/'

saveJsonObj(106);
//readJsonObj(102);
//makeqrcode();
//makeKeyToken();
//TestAuth(722980);
router.get('/', function(req, res, next) {
    console.log('This was used HAHAHAHA line 13');
    let keyToBeUsed = saveJsonObj(req.user.id);
    console.log('This was used HAHAHAHA line 15');

    let uriForQR = auth.generateTotpUri(keyToBeUsed, req.user.id, "ACME Co", 'SHA1', 6, 30);
    res.status(200).json({Uri: uriForQR});
});

router.post('/authenticateConfirm', function(req, res, next) {
    let user = readJsonObj(req.user.id);
    
    let formattedKey = user.authtoken;

  if(  auth.verifyToken(formattedKey, req.body.authToken) !== null) {
      res.status(200).send('token are valid!');

  } else {
      res.status(500).send('token invalid');
  }
});





function saveJsonObj(userId) {
    let authToken = auth.generateKey();
let user = {
            userid: userId,
            authtoken: authToken
            };

console.log(authToken + ' ' + 'line 45');

let savePath = path + 'authUser' + user.userid + '.json';

let data = JSON.stringify(user, null, 2);
console.log(data);
fs.writeFileSync(savePath, data);

return user.authtoken;

};



function readJsonObj(userId) {

    let readPath = path + 'authUser' + userId + '.json';

    let rawdata = fs.readFileSync(readPath);  
    let user = JSON.parse(rawdata);

    console.log(user);
    return user;
};

function TestAuth(key) {
    console.log(key);
    let user = readJsonObj(393);
    
    let formattedKey = user.authtoken;

  if(  auth.verifyToken(formattedKey, key) === null) {
      console.log('IT WORKS ITS THE RIGHT KEY line 77');

  } else {
      console.log('SOMETHING IS WRONG????');
  }
}

function makeKeyToken() {
    let user = readJsonObj(393);

   
   let tokenkey = auth.generateToken(user.authtoken);
   console.log(tokenkey);
   TestAuth(tokenkey);

   
}
function makeqrcode(key){
    let keyToBeUsed = saveJsonObj(key);
    
        let uriForQR = auth.generateTotpUri(keyToBeUsed, 393, "ACME Co", 'SHA1', 6, 30);
        console.log(uriForQR);
}

module.exports = router;
