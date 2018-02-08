import jwt from 'jsonwebtoken';
import {getUserByUsername, verifyPassword} from '../db/user';

export async function authenticate(req, res, next) {
    console.log("AUTHENTICATE");
    try {
        let username = req.body.username.toLowerCase();
        let password = req.body.password;

        let user = await getUserByUsername(username);
        let success = await verifyPassword(password, user.password_hash);
        const payload = {
            username: username,
            name: user.name
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        req.token = token;
        next();
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify(e));
    }
};

export async function isAuthenticated(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let decoded = jwt.verify(token, process.env.SECRET_KEY);
        let username = decoded.username;
        // TODO check if user actually exists
        console.log("User " + username + " is authenticated  ");
        req.username = username;
        next();
    } catch (err) {
        res.status(401).send({message: "unauthorized"});
    };
};
