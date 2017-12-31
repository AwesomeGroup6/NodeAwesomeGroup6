const express = require('express');
const router = express.Router();
const auth = require('authenticator');
const fs = require('fs');
let path = './Authenticator/'

let user = {};

//saveJsonObj(106);
//readJsonObj(102);
//makeqrcode();
//makeKeyToken();
//TestAuth(722980);
router.get('/', function(req, res, next) {
    console.log('This was used HAHAHAHA line 13');
   // let keyToBeUsed = saveJsonObj(req.user.id);
    console.log('This was used HAHAHAHA line 15');
    let keyToBeUsed = makeKeyToken(req.user.id);
    let uriForQR = auth.generateTotpUri(keyToBeUsed, req.user.id, "ACME Co", 'SHA1', 6, 30);
    res.status(200).json({Uri: uriForQR});
});

router.post('/authenticateConfirm', function(req, res, next) {
    console.log(user);
    let formattedKey = user.authtoken;
    console.log(formattedKey);
    console.log(req.body.key);
    try {
    console.log(auth.verifyToken(formattedKey, req.body.key));
    }catch(err) {
        console.log(err);
    }
  if(  auth.verifyToken(formattedKey, req.body.key) !== null) {
      try{
      saveJsonObj(formattedKey, req.user.id)
      }catch(err){console.log(err);}
      res.status(200).send('token are valid!');
  } else {
      res.status(500).send('token invalid');
  }
});





function saveJsonObj(key, userId) {
  
 

console.log(key + ' ' + 'line 45');

let savePath = path + 'authUser' + userId + '.json';
console.log(savePath + ' line 48');

let userToWrite = {
    userid: userId,
    authtoken: key
}

let data = JSON.stringify(userToWrite, null, 2);
console.log(data);
try {
    console.log(savePath + ' ' + 'line 58');
    console.log(data + ' ' + 'line 59');
    
fs.writeFileSync(savePath, data);
}
catch(err) {
    console.log(err);
}
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

function makeKeyToken(id) {
   // let user = readJsonObj(393);
   let authToken = auth.generateKey();
   user = {
    userid: id,
    authtoken: authToken
    };
    return authToken;
   
}
function makeqrcode(key){
    let keyToBeUsed = saveJsonObj(key);
    
        let uriForQR = auth.generateTotpUri(keyToBeUsed, 393, "ACME Co", 'SHA1', 6, 30);
        console.log(uriForQR);
}

module.exports = router;
