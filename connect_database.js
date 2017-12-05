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
            pool.close()
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
              pool.close()
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

 function savePost(UserId, PostContent) {
    try {
    return new Promise((resolve, reject) =>
    {
        pool.connect().then(pool => {
            console.log('before request');
             return pool.request()
                .input('UserId', sql.Int, UserId)
                .input('PostContent', sql.VarChar(100), PostContent)
                .execute('createPost')
          }).then(result => {
              console.dir(result);
              console.log(result.rowsAffected[0]);
              resolve(result.rowsAffected[0]);
             pool.close()

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
            pool.close()

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
           pool.close()

           //sql.close();
         }).catch(err => {
             // ... error checks
             console.dir(err);
             reject(err);
         })
     });

 }

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

function getFriendsPost(UserId){

    return new Promise((resolve, reject) =>
    {
        pool.close();

        pool.connect().then(pool => {
            console.log('before request');
            return pool.request()
                .input('UserId', sql.Int(50), UserId)
                .execute('displayFriendsPosts')
        }).then(result => {
            resolve(result.recordset);
            pool.close()

        }).catch(err => {
            reject(err);
        })
    });

};


function getFriends(UserId){

    return new Promise((resolve, reject) =>
    {
        pool.close();
        pool.connect().then(pool => {
            return pool.request()
                .input('UserId', sql.Int(50), UserId)
                .execute('getFriends')
        }).then(result => {
            resolve(result.recordset);
            pool.close()

            pool.close()
        }).catch(err => {
            reject(err);
        })
    });

};

function getGroupsUserIsPartOf(UserId){
    return new Promise((resolve, reject) =>
    {
        pool.connect().then(pool => {
            console.log('before request');
            return pool.request()
                .input('userId', sql.Int(50), UserId)
                .execute('displayGroupsIPartOf')
        }).then(result => {
            resolve(result.recordset);
            pool.close()
        }).catch(err => {
            reject(err);
        })
    });

};


function findFriends(FirstName,LastName) {

    return new Promise((resolve,reject) =>

    {
        pool.connect().then(pool => {
            return pool.request()
            .input("FirstName",sql.VarChar(50),FirstName)
                .input("LastName",sql.VarChar(50),LastName)
                .execute('findFriend')
        }).then(result => {
            resolve(result.recordset);
            pool.close();
        }).catch(err => {
            reject(err);
        });


    });

}


function findGroup(title) {

    return new Promise((resolve,reject) =>
    {
        pool.connect().then(pool =>{
            return pool.request()
                .input("title",sql.VarChar(50),title)
                .execute('findGroup')
        }).then(result => {
            resolve(result.recordset);
            pool.close();
        }).catch(err =>{
            reject(err);
        })
    })



}

function joinGroup(userId,groupId) {
    try {

    return new Promise((resolve,reject) =>

    {
        pool.connect().then(pool =>{
            return pool.request()
                .input("userId",sql.Int(50),userId)
                .input("groupId",sql.VarChar(50),groupId)
                .execute('joinGroup')
        }).then(result  =>{
            console.dir(result);
            console.log(result.rowsAffected[0]);
            resolve(result.rowsAffected[0]);
            pool.close();

        }).catch(err =>{
            reject(err);
    })

    });

    }catch(err){
            console.log(err);
        }
}

function requestFriendship(UserId, FriendId) {
    try {
    return new Promise((resolve, reject) =>
    {
        pool.connect().then(pool => {
            console.log('before request');
             return pool.request()
                .input('UserId', sql.Int, UserId)
                .input('FriendId', sql.Int, FriendId)
                .execute('requestFriendship')
          }).then(result => {
            resolve(result.rowsAffected[0]);
             pool.close()

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


function addcomment(PostId,UserId,CommentText) {

    try {
        return new Promise((resolve, reject) =>
        {
            pool.connect().then(pool => {
                console.log('before request');
                return pool.request()
                    .input('PostId', sql.Int, PostId)
                    .input('UserId', sql.Int, UserId)
                    .input('CommentText',sql.VarChar(50))
                    .execute('createComment')
            }).then(result => {
                resolve(result.rowsAffected[0]);
                pool.close()

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

     }


function receiveFriendRequest(UserId){
    return new Promise((resolve, reject) =>
    {
        console.log('before connect')

        pool.connect().then(pool => {
            console.log('before request');
            return pool.request()
                .input('UserId', sql.Int, UserId)
                .execute('getFriendrequest1')
        }).then(result => {
            resolve(result.recordset);
            pool.close()

            //sql.close();
        }).catch(err => {
            // ... error checks
            console.dir(err);
            reject(err);
        })
    });

}


function revokeFriendship(UserId,FriendId){

    return new Promise((resolve, reject) =>
    {
        console.log('before connect')

        pool.connect().then(pool => {
            console.log('before request');
            return pool.request()
                .input('UserId', sql.Int, UserId)
                .input('FriendId', sql.Int, FriendId)
                .execute('revokeFriendship')
        }).then(result => {
            console.log(result.rowsAffected[0]);
            resolve(result.rowsAffected[0]);
            pool.close()
        }).catch(err => {
            // ... error checks
            console.dir(err);
            reject(err);
        })
    });

}


function getComments(PostId){

    return new Promise((resolve, reject) =>
    {
        console.log('before connect')

        pool.connect().then(pool => {
            console.log('before request');
            return pool.request()
                .input('PostId', sql.Int, PostId)
                .execute('getComments')
        }).then(result => {
            console.log(result.recordset);
            resolve(result.recordset);
            pool.close()
            pool.close()
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
     deletePost: deletePost,
     getFriendsPost :getFriendsPost,
     getFriends: getFriends,
     getGroupsUserIsPartOf : getGroupsUserIsPartOf,
     findFriends:findFriends,
     findGroup: findGroup,
     joinGroup:joinGroup,
     requestFriendship: requestFriendship,
     addcomment: addcomment,
     deleteComment: deleteComment,
     receiveFriendRequest:receiveFriendRequest,
     revokeFriendship:revokeFriendship,
     getComments:getComments


 };
 


