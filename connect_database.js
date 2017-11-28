const connect = require('tedious');
const request = require('tedious').Request;

let config = {
    userName: 'Lucia',
    password: 'Klucinka007',
    server: 'socialmediadatabase.database.windows.net',
    options: {
        database: 'SocialMedia_DB',
        encrypt: true
    }
};

let connection = new connect.Connection(config);

connection.config.options.rowCollectionOnDone = true;

connection.on('connect', function (err) {
    if(err) {
        console.log(err);
    } else {
        test();
        return connection;
    }


    function test() {
        let req = new request(
            "SELECT * FROM Account",
            function (err, rowCount) {
                console.log(err, rowCount);
            }
        );

        req.on('row', function (col) {
           for(let i = 0; i < col.length; i++){
               console.log(col[i].value);
           }
        });

        connection.execSql(req);

    }
});
