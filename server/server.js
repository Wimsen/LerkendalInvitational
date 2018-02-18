import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import {createMessage} from './db/chat';
import {createUser} from './db/user';
import {testfunc} from './db/tournament';
import {createAdmin} from './db/admin';

import {
    userRouter,
    chatRouter,
    s3Router,
    teamRouter,
    costumeRouter,
    adminRouter,
    matchesRouter
} from './routes'

let port = process.env.NODE_ENV === "production"
    ? 8080
    : 8079;
const app = express();

if (process.env.NODE_ENV == 'production')
    app.use(morgan('combined'))
else
    app.use(morgan('dev'));

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/costume', costumeRouter);
app.use('/api/team', teamRouter);
app.use('/api/match', matchesRouter);
app.use('/api/admin', adminRouter);
app.use('/s3', s3Router);

app.get('*', (req, res) => {
    console.log("standard return ");
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', async (socket) => {
    console.log("Connected");
    socket.on('message', async (message) => {
        console.log(message);
        socket.broadcast.emit('message', message); // Send message to everyone BUT sender
        try {
            await createMessage(message);
            console.log("Saved ok");
        } catch (e) {
            console.log(e);
        }
    });
    socket.on('disconnect', () => {
        console.log("disconnect");
    });
});

app.listen(process.env.PORT || port);
server.listen(8082);
console.log("Server started");
