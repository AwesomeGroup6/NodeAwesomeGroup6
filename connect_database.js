const sql = require('mssql');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();

let config= ({
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
            const pool2 = new sql.ConnectionPool(config,err => {


        console.log('before request getLogin25');

         pool2.request()

        .input('Email', sql.VarChar(50), email)
        .execute('checkLogin1',(err, result) => {

            if(err){

                console.log("something went wrong");
            }

        try {
            let hash = result.recordset[0].Password;
        const a = password;

        if(bcrypt.compareSync(a,hash)) {
        resolve(result.recordset[0]);
        pool2.close();
                }

        } catch(err) {
            console.log('user incorrect');
            reject(err);
        }

        })

    })
            pool2.on('error', err => {
                pool2.close();

            })
});

}

       /* console.log('before connect');

        pool.connect().then(pool => {
            console.log('before request');
            return pool.request()
                .input('Email', sql.VarChar(50), email)
                .execute('checkLogin1')
        }).then(result => {

            const a = password;
            let hash = result.recordset[0].Password;

            console.log(bcrypt.compareSync(a,hash));

            console.log("hash" + result.recordset[0].Password);
            console.log("password" + password);

            if(bcrypt.compareSync(a,hash)) {
                console.dir(result.recordset[0]);
                resolve(result.recordset[0]);
                pool.close()
            }
            else{
                console.log("does not match");
            }
        }).catch(err => {
            // ... error checks
            console.dir(err);
            reject(err);*/



 // function which will save a user to the database with the used of stored procedues it will get data from frontend.
 function saveAccount(Email, Password, FirstName, LastName) {
    try {
    return new Promise((resolve, reject) =>
    {

      const hash =  bcrypt.hashSync(Password, salt);

      console.log(hash, 'here');


        const pool3 = new sql.ConnectionPool(config,err => {


                console.log('before request saveAccount108');

        pool3.request()
                .input('FirstName', sql.VarChar(50), FirstName)
                .input('LastName', sql.VarChar(50), LastName)
                .input('Email', sql.VarChar(50), Email)
                .input('Password', sql.VarChar(100), hash)
                .execute('signUpUser',(err, result) => {

                    console.dir(result);
                    console.log(result.rowsAffected[0]);
                     resolve(result.rowsAffected[0]);
                    pool3.close()
    }).catch(err => {
            // ... error checks
            console.dir(err);
        reject(err);
    })

    })

    });
}catch(err) {
    console.log(err);
        reject(err);

    }


 }

 function savePost(UserId, PostContent) {
    try {
    return new Promise((resolve, reject) =>
    {
        const pool4 = new sql.ConnectionPool(config,err => {
                console.log('before request savePost 144');

                pool4.request()
                .input('UserId', sql.Int, UserId)
                .input('PostContent', sql.VarChar(100), PostContent)
                .execute('createPost',(err, result) => {

                    if(err){
                        console.log(err);
                    }

                console.dir(result);
                console.log(result.rowsAffected[0]);
                resolve(result.rowsAffected[0]);
                pool4.close();

        })


    })

        pool4.on('error', err => {
            pool4.close();

        })
          
    }).catch(err => {
        // ... error checks
        console.dir(err);
        reject(err);
    });
}catch(err) {
console.log(err);
}
 }
/*

 function getUserIdFromEmail(email) {


     return new Promise((resolve, reject) =>
      {
          console.log('before connect')

     const pool5 = new sql.ConnectionPool(config,err => {
             console.log('before request');

     pool5.request()
                .input('Email', sql.VarChar(50), email)
                .execute('getUserIdFromEmail',(err, result) => {


         console.dir(result.recordset[0].UserId);
     resolve(result.recordset[0].UserId);
     pool.close()

     //sql.close();

     }).catch(err => {
              // ... error checks
              console.dir(err);
              reject(err);
          })
      });
      
 })
 }
*/


/*

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
           pool.close()

           //sql.close();
         }).catch(err => {
             // ... error checks
             console.dir(err);
             reject(err);
         })
     });

 }
*/
/*
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
                 pool.close()

                 //sql.close();
             }).catch(err => {
                 // ... error checks
                 console.dir(err);
                 reject(err);
             })
         });
     
}*/

function getFriendsPost(UserId){

    return new Promise((resolve, reject) =>
    {
        const pool5 = new sql.ConnectionPool(config,err => {
                console.log('before request getFriends272');

            pool5.request()
                .input('UserId', sql.Int(50), UserId)
                .execute('displayFriendsPosts',(err, result) => {

                    if(err){
                        console.log(err);
                    }

                resolve(result.recordset);
                pool5.close()

            })


        })
        pool5.on('error', err => {
            pool5.close();

        })
    });

}


function getFriends(UserId){

    return new Promise((resolve, reject) =>
    {
        const pool6 = new sql.ConnectionPool(config,err => {
                console.log('before request getfriends303');

                pool6.request()
                .input('UserId', sql.Int(50), UserId)
                .execute('getFriends',(err, result) => {

                    if(err){

                        console.log(err);
                    }

                    resolve(result.recordset);

                })

        })

            pool6.on('error', err => {
            pool6.close();

            })
    });
}


function getGroupsUserIsPartOf(UserId) {

    return new Promise((resolve, reject) =>

    {
        console.log('before request getgroupsuserispartof333');

        const pool7 = new sql.ConnectionPool(config, err => {

            pool7.request()
                .input('userId', sql.Int(50), UserId)
                .execute('displayGroupsIPartOf', (err, result) => {

                    if(err){
                        console.log(err);
                    }

                    resolve(result.recordset);
                    pool7.close();

                })
            })

        pool7.on('error', err => {
            pool7.close();

        })

    });
}


function findFriends(FirstName,LastName) {

    return new Promise((resolve,reject) =>

    {
        const pool8 = new sql.ConnectionPool(config, err => {

            pool8.request()
            .input("FirstName",sql.VarChar(50),FirstName)
                .input("LastName",sql.VarChar(50),LastName)
                .execute('findFriend',(err, result) => {

                    if(err){
                        console.log(err);
                    }
                resolve(result.recordset);
            })
        })

        pool8.on('error', err => {
            pool8.close();

        })


    });

}


function findGroup(title) {

    return new Promise((resolve,reject) =>
    {
        const pool9 = new sql.ConnectionPool(config,err => {

            pool9.request()

                .input("title",sql.VarChar(50),title)
                .execute('findGroup',(err, result) => {

                    if(err){
                        console.log(err);
                    }

                resolve(result.recordset);
                 pool9.close();
            })

        })

        pool9.on('error', err => {
            pool9.close();

        })


    });

}

function joinGroup(userId,groupId) {

    return new Promise((resolve,reject) =>

    {
        const pool10 = new sql.ConnectionPool(config,err => {
                pool10.request()
                .input("userId",sql.Int(50),userId)
                .input("groupId",sql.VarChar(50),groupId)
                .execute('joinGroup',(err, result) => {

                    if(err){
                        console.log(err);
                    }
                console.dir(result);
                console.log(result.rowsAffected[0]);
                resolve(result.rowsAffected[0]);
                pool10.close();
                })
        })

        pool10.on('error', err => {
            poo10.close();

        })


    });

}

function requestFriendship(UserId, FriendId) {

        return new Promise((resolve, reject) =>
        {
            const pool11 = new sql.ConnectionPool(config,err => {
                pool11.request()
                return pool11.request()
                    .input('UserId', sql.Int, UserId)
                    .input('FriendId', sql.Int, FriendId)
                    .execute('requestFriendship',(err, result) => {

                        if(err){
                            console.log(err);
                        }
                        resolve(result.rowsAffected[0]);
                        pool11.close();
                    })
                })


            pool11.on('error', err => {
                poo11.close();

            })



        });

}





function addcomment(PostId,UserId,CommentText) {

        return new Promise((resolve, reject) =>{
            const pool12 = new sql.ConnectionPool(config, err => {
                    pool12.request()
                    .input('PostId', sql.Int, PostId)
                    .input('UserId', sql.Int, UserId)
                    .input('CommentText',sql.VarChar(100),CommentText)
                    .execute('createComment',(err, result) => {

                        if(err){

                            console.log(err);
                        }

                    resolve(result.rowsAffected[0]);
                    pool12.close()

                })

            })

            pool12.on('error', err => {
                poo12.close();

            })

        });

}
/*
     function deleteComment(commentId) {
         return new Promise((resolve, reject) =>
         {
             console.log('before connect')

             pool.connect().then(pool => {
                 console.log('before request');
                 return pool.request()
                     .input('CommentId', sql.Int, commentId)
                     .execute('deleteComment')
             }).then(result => {
                 console.log(result.rowsAffected[0]);
                 resolve(result.rowsAffected[0]);
                 pool.close()

                 //sql.close();
             }).catch(err => {
                 // ... error checks
                 console.dir(err);
                 reject(err);
             })
         });

     }*/


function receiveFriendRequest(UserId){
    return new Promise((resolve, reject) =>
    {
        console.log('before connect')

        const pool13 = new sql.ConnectionPool(config, err => {
            pool13.request()
                .input('UserId', sql.Int, UserId)
                .execute('getFriendrequest1',(err, result) => {

                    if(err){
                        console.log(err);
                    }

                    resolve(result.recordset);
                    pool13.close();

                })


        })

        pool13.on('error', err => {
            poo13.close();
        })

        });

}


function revokeFriendship(UserId,FriendId){

    return new Promise((resolve, reject) =>
    {
        console.log('before connect')

        const pool14 = new sql.ConnectionPool(config, err => {
            pool14.request()
                .input('UserId', sql.Int, UserId)
                .input('FriendId', sql.Int, FriendId)
                .execute('revokeFriendship',(err, result) => {

                    if(err){
                        console.log(err);
                    }

                    console.log(result.rowsAffected[0]);
                    resolve(result.rowsAffected[0]);
                    pool14.close()

                })
        })

        pool14.on('error', err => {
            poo14.close();
        })
    });

}


function getComments(PostId){

    return new Promise((resolve, reject) =>
    {
        const pool15 = new sql.ConnectionPool(config, err => {
            pool15.request()
                .input('PostId', sql.Int, PostId)
                .execute('getComments',(err, result) => {

                    resolve(result.recordset);
                    pool15.close()

            })

        })
        pool15.on('error', err => {
            poo15.close();
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
/*
     getidfromemail: getUserIdFromEmail,
*/
/*
     deletePost: deletePost,
*/
     getFriendsPost :getFriendsPost,
     getFriends: getFriends,

     getGroupsUserIsPartOf : getGroupsUserIsPartOf,

     findFriends:findFriends,
     findGroup: findGroup,
     joinGroup:joinGroup,
     requestFriendship: requestFriendship,
     addcomment: addcomment,
/*
     deleteComment: deleteComment,
*/
     receiveFriendRequest:receiveFriendRequest,
     revokeFriendship:revokeFriendship,
     getComments:getComments

 };
 


