
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

//adds a death or completion (or anything else)
exports.add = functions.https.onRequest(async (req, res) => {
    await db.collection(req.query.collection).add({ ...req.body, created: admin.firestore.FieldValue.serverTimestamp() });
    res.status(200).json("Entry added successfully.");
});