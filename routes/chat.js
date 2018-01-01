const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const crypto = require('crypto');
const assert = require('assert');
const iocane = require("iocane").crypto;
const db = require('../connect_database');

server.listen(5000);
var clients = {};
var sender;
var senderKey

io.on('connection', function (socket) {
    console.log('User connected' + socket.id);


    socket.on('add-user', function(data){

        let ECDH = crypto.createECDH("secp256k1");
            ECDH.generateKeys();
        let PublicKey = ECDH.getPublicKey(null, "compressed"),
            PrivateKey =ECDH.getPrivateKey(null, "compressed");

        if (!clients[data.username]) {

            clients[data.username] = {
                "socket": socket.id,
                "ECDH": ECDH,
                "PublicKey": PublicKey

            };
        }
        console.log("already exist");

        console.log(clients);
    });

    socket.on('private-message', function(data){


        console.log(data.username);


        console.log("Sending: " + data.message + " to " + data.username + " from " + data.a);


        if (clients[data.username]){

            let secret1 = clients[data.a].ECDH.computeSecret(clients[data.username].PublicKey);
            let secret2 = clients[data.username].ECDH.computeSecret(clients[data.a].PublicKey);

            console.log("Sender Secret: ", secret1.length, secret1.toString("hex"));
            console.log("Receiver Secret: ",   secret2.length, secret2.toString("hex"));

            iocane
                .encryptWithPassword(data.message, secret1)
                .then(function(encrypted) {
                    data.message = encrypted;
                    console.log("encrypted text" + encrypted);

                    iocane
                        .decryptWithPassword(data.message, secret2)
                        .then(function(message) {
                            data.message = message;
                            console.log("decrypted text" + message);

                            io.sockets.connected[clients[data.username].socket].emit("add-message", data);
                            // "Hi there, Bob!"
                        });

                });

        } else {
            console.log("User does not exist: " + data.username);
        }
    });

    socket.on('save-message', function (message,username) {
        console.log("server" + message,username);
        io.emit('new-message', {message: message});
        io.emit('new-user', {username: username});

    });


    socket.on('disconnect', function() {
        for(var name in clients) {
            if(clients[name].socket === socket.id) {
                delete clients[name];
                break;
            }
        }
    })


});