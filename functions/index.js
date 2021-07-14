
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
require("dotenv").config();

//adds a death or completion (or anything else)
//security: requests must come with a password to ensure they are coming from the game client
//note that u must use the post method
exports.add = functions.https.onRequest(async (req, res) => {
    await db.collection(req.query.collection).add(req.body);
    res.status(200).json("Entry added successfully.");
});