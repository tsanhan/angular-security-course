

import express from 'express';
import {Application} from "express";
import  fs from 'fs';
import  https from 'https';
import {readAllLessons} from "./read-all-lessons.route";
import {createUser} from "./create-user.route";
import { AddressInfo } from 'net';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app: Application = express();

app.use(bodyParser.json());
app.use(cookieParser());

const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'secure', type: Boolean},
];

const options = commandLineArgs(optionDefinitions);


// REST API
app.route('/api/lessons')
    .get(readAllLessons);

app.route('/api/signup')
    .post(createUser);


if (options.secure) {

    const httpsServer = https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app);

    // launch an HTTPS Server. Note: this does NOT mean that the application is secure
    httpsServer.listen(9000, () => console.log("HTTPS Secure Server running at https://localhost:" + (httpsServer.address() as AddressInfo) .port));

}
else {

    // launch an HTTP Server
    const httpServer = app.listen(9000, () => {
        console.log("HTTP Server running at https://localhost:" + (httpServer.address() as AddressInfo).port);
    });

}








