const router = require("express").Router();
let Completion = require("../models/completion");

router.route("/").get((req, res) => {
    Completion.find()
        .then(completion => res.json(completion))
        .catch(e => { console.log(e); res.status(400).json(e); });
});

router.route("/add").post((req, res) => {
    const newCompletion = new Completion(req.body);

    newCompletion.save()
        .then(() => {
            console.log("Level Completed: ", newCompletion);
            res.json("Level completion added successfully.");
        })
        .catch(e => { console.log(e); res.status(400).json(e); });
});

module.exports = router;