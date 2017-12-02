const sql = require('mssql')
let pool = new sql.ConnectionPool({
    user: 'Lucia',
    password: 'Klucinka007',
    server: 'socialmediadatabase.database.windows.net',
    database: 'SocialMedia_DB',
    options: {
        encrypt: true
    }
});


// function which gets a login from an email
function getLogin(email, password) {
    //let emailTest = 'rlgqpxt.kdnni@jnom.org';
     return new Promise((resolve, reject) =>
      {
          console.log('before connect')

        pool.connect().then(pool => {
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
        pool.connect().then(pool => {
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

 function savePost(UserId, postContent) {
    try {
    return new Promise((resolve, reject) =>
    {
        pool.connect().then(pool => {
            console.log('before request');
             return pool.request()
                .input('UserId', sql.Int, UserId)
                .input('postContent', sql.VarChar(100), postContent)
                .execute('createPost')
          }).then(result => {
              console.dir(result);
              console.log(result.rowsAffected[0]);
              resolve(result.rowsAffected[0]);
             // sql.close();
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

 function getUserIdFromEmail(email) {
     return new Promise((resolve, reject) =>
      {
          console.log('before connect')

        pool.connect().then(pool => {
            console.log('before request');
             return pool.request()
                .input('Email', sql.VarChar(50), email)
                .execute('getUserIdFromEmail')
          }).then(result => {
              console.dir(result.recordset[0].UserId);
              resolve(result.recordset[0].UserId);
              //sql.close();
          }).catch(err => {
              // ... error checks
              console.dir(err);
              reject(err);
          })
      });
      
 }
 
 sql.on('error', err => {
     console.log(err)
 })


 function deletePost(postId) {
    return new Promise((resolve, reject) =>
     {
         console.log('before connect')

       pool.connect().then(pool => {
           console.log('before request');
            return pool.request()
               .input('PostId', sql.Int, postId)
               .execute('deletePost')
         }).then(result => {
            console.log(result.rowsAffected[0]);
            resolve(result.rowsAffected[0]);
             //sql.close();
         }).catch(err => {
             // ... error checks
             console.dir(err);
             reject(err);
         })
     });
     
}

sql.on('error', err => {
    console.log(err)
})
 
 
 
 module.exports = {
     connection: getLogin,
     addaccount: saveAccount,
     addpost: savePost,
     getidfromemail: getUserIdFromEmail,
     deletePost: deletePost
 };
 


