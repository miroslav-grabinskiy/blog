"use strict";
const app = require('./app'),
    http = require('http');

const server = http.createServer(app);

server.listen(
    app.get('port'),
    () => console.log('app listening on port: ' + app.get('port') )
);