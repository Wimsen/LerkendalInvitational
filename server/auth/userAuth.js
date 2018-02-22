import jwt from 'jsonwebtoken';
import {getTeamByEmail, verifyPassword} from '../db/team';

export async function authenticate(req, res, next) {
    console.log("AUTHENTICATE");
    try {
        let username = req.body.username.toLowerCase();
        let password = req.body.password;

        let user = await getTeamByEmail(username);
        let success = await verifyPassword(password, user.password_hash);

        const payload = {
            id: user.id,
            username: username,
            teamname: user.teamname
        };
        console.log("payload");
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
        console.log("Is user auth?");
        const token = req.headers["auth"].split(' ')[1];
        let decoded = jwt.verify(token, process.env.SECRET_KEY);
        let username = decoded.username;
        let userid = decoded.id;
        // TODO check if user actually exists
        console.log("User " + username + " is authenticated  ");
        req.username = username;
        req.userid = userid;
        next();
    } catch (err) {
        res.status(401).send({message: "unauthorized"});
    };
};
