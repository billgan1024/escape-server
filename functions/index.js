const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const express = require("express");
const app = express();

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// then, check if the email is verified and their username is set to a non-empty string
const validateToken = async (req, res, next) => {
    //access headers object
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        functions.logger.error(
            "No Firebase ID token was passed as a Bearer token in the Authorization header.",
            "Make sure you authorize your request by providing the following HTTP header:",
            "Authorization: Bearer <Firebase ID Token>"
        );
        res.status(403).send("Unauthorized");
        return;
    }
    const idToken = req.headers.authorization.split("Bearer ")[1];
    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        functions.logger.log("ID Token correctly decoded", decodedIdToken);
        if (!decodedIdToken.email_verified) {
            functions.logger.error(`${decodedIdToken.email} does not have their email verified.`);
            res.status(403).send("Unauthorized");
        } else {
            req.user = decodedIdToken; //add the decoded stuff to the request before it hits the endpoint
            next();
        }
    } catch (e) {
        functions.logger.error(e);
        res.status(403).send("Unauthorized");
    }
};

app.use(validateToken);

app.get("/", (req, res) => {
    res.status(200).send("Email verified");
});

// This HTTPS endpoint can only be accessed by firebase users who have their emails verified.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`
// api contains all protected routes
exports.app = functions.https.onRequest(app);

// all unprotected routes
exports.signUp = functions.https.onRequest((req, res) => {
    //note: res.send() will handle all data types correctly
    if (req.method === "POST") {
        admin.auth().createUser({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.username
        }).then((userRecord) => {
            res.status(200).send(userRecord);
        }).catch((e) => {
            res.status(400).send(e);
        });
    } else {
        res.status(400).send("Bad request");
    }
});
