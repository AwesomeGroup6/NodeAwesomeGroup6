const sql = require('mssql')


let config = {
    user: 'Lucia',
    password: 'Klucinka007',
    server: 'socialmediadatabase.database.windows.net',
    database: 'SocialMedia_DB',
    options: {
        encrypt: true
    }
};


// function which gets a login from an email
function getLogin(email, password) {
    //let emailTest = 'rlgqpxt.kdnni@jnom.org';
     return new Promise((resolve, reject) =>
      {
          console.log('before connect')

        new sql.connect(config).then(pool => {
            console.log('before request');
             return pool.request()
                .input('Email', sql.VarChar(50), email)
                .input('Password', sql.VarChar(50), password)
                .execute('checkLogin')
          }).then(result => {
              console.dir(result.recordset[0].UserId);
              resolve(result.recordset[0].UserId);
          }).catch(err => {
              // ... error checks
              console.dir(err);
              reject(err);
          })
      });
 }

 // function which will save a user to the database with the used of stored procedues it will get data from frontend.
 function saveAccount(Email, Password, FirstName, LastName) {
    try {
    return new Promise((resolve, reject) =>
    {
        new sql.connect(config).then(pool => {
            console.log('before request');
             return pool.request()
                .input('FirstName', sql.VarChar(50), FirstName)
                .input('LastName', sql.VarChar(50), LastName)
                .input('Email', sql.VarChar(50), Email)
                .input('Password', sql.VarChar(50), Password)
               // .input('PhoneNumber', sql.VarChar(50), PhoneNumber)
                .execute('signUpUser')
          }).then(result => {
              console.dir(result);
              console.log(result.rowsAffected[0]);
              resolve(result.rowsAffected[0]);
          }).catch(err => {
              // ... error checks
              console.dir(err);
              reject(err);
          })
    });
}catch(err) {
    console.log(err);
}
 }
 
 sql.on('error', err => {
     console.log(err)
 })
 
 
 
 module.exports = {
     connection: getLogin,
     addaccount: saveAccount
 };
 


