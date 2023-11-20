const config = require('./config.js');
const express = require('express');
const app = require('express')();
module.exports.app = app;
const util = require('./util.js');
const apiDoc = require('./apiDoc.js');
const fs = require('fs');


let countUserUid = 0;
class User {
    constructor(id, password) {
        this.id = id
        this.password = password
        this.uid = countUserUid++;
    }

    /**
     * 
     * @param { { id: string, password: string }} args 
     * @returns 
     */
    select(args) {
        let keys = Object.keys(args);
        for (let i = 0; i < keys.length; i++) {
            if(this[keys[i]] !== args[keys[i]]) {
                return false
            }
        }

        return true
    }
}

/**
 * @type {Array<User>}
 */
const userList = [];
module.exports.userList = userList;
module.exports.selectUser = function(id, password) {
    let arr = [];
    for (let i = 0; i < userList.length; i++) {
        if(
            userList[i].select({
                id: id,
                password: password
            })
        ) {
            arr.push(userList[i])
        }
    }

    return arr;
}

userList.push(new User('test1', 'password'));
userList.push(new User('test2', 'password'));
userList.push(new User('test3', 'password'));

console.log('user: ', userList);



const http = require('http');
const httpServer = http.createServer(app);

app.use(function (req, res, next) {
    console.log(`[${util.dateToString(new Date())}] ${req.method} ${req.ip} ${req.url} `);
    next();
})

require('./api/control/login.js')

app.get('/api-doc/api.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(apiDoc));
})

app.get('*', express.static(
    'public',
));

const notFoundPage = fs.readFileSync(__dirname + '/public/404.html')
app.get('*', function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(404);
    res.end(notFoundPage);
});


httpServer.listen(config.serverPort, () => {
    console.log(
        `[${util.dateToString(new Date())}] start server \n` +
        `swagger : http://localhost:${config.serverPort}/api-doc/`
    );
});