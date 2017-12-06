const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const cors = require('cors');

let index = require('./routes/index');
let publicroutes = require('./routes/public');
let secret = require('./config').secret;
let friends = require('./routes/friends');
let groups = require('./routes/groups');
let posts = require('./routes/posts');
let comments = require('./routes/comments');
let friendshipRequest = require('./routes/friendshipRequest');
let chat = require('./routes/chat');

const app = express();

/* making a session for the application, */
app.use(cookieParser());
app.use(cors());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use('/public', publicroutes);


app.use(function(req, res, next){
  if(req.headers && req.headers.authorization){

    let token = req.headers.authorization.split(' ')[1];
    console.log(token);
    
    jwt.verify(token, secret, function(err, decode){
      if (err) res.status(401).send({text: 'User not identified'});
      req.user = decode;


      next();
    });
  }else {
    res.status(401).send({text: 'No token provided'});
}

});

app.use('/friends',friends);
app.use('/groups',groups);
app.use('/posts',posts);
app.use('/comments',comments);
app.use('/friendshipRequest',friendshipRequest);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
