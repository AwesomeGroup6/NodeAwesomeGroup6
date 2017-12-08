const sql = require('mssql');

let config = {
    user: 'Lucia',
    password: 'Klucinka007',
    server: 'socialmediadatabase.database.windows.net',
    database: 'SocialMedia_DB',
    options: {
        encrypt: true
    }
};




 function getLogin(email) {
   let emailTest = 'rlgqpxt.kdnni@jnom.org';
    return new Promise((resolve, reject) =>
     {
         new sql.ConnectionPool(config).connect().then(pool => {
             return pool.query`select password from Account where email = ${email}`
         }).then(result => {
             console.dir(result);
             resolve(result.recordset[0].password);
         }).catch(err => {
             // ... error checks
             reject(err);
         })
     });



   /*
     connection.request()
            .input('email', sql.VarChar, email)
            .query('select password from Account where email = @email')
            .then(result1 => {
                console.log(result1.recordset[0].password);
                return result1.recordset[0].password;
            }).catch(err => {
                console.log(err)
            })*/
}

sql.on('error', err => {
    console.log(err)
})



module.exports = {
    connection: getLogin
};

