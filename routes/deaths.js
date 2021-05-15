const router = require("express").Router();
let Death = require("../models/death");

router.route("/").get((req, res) => {
    //retrieve all deaths
    Death.find()
        .then(deaths => res.json(deaths))
        .catch(e => { console.log(e); res.status(400).json(e); });
});

router.route("/add").post((req, res) => {
    //post the request body object and save it to the database
    const newDeath = new Death(req.body);

    newDeath.save()
        .then(() => {
            console.log("Death: ", newDeath);
            res.json("Death added successfully.");
        })
        .catch(e => { console.log(e); res.status(400).json(e); });
});

router.route("/clear").delete((req, res) => {
    Death.deleteMany({})
    .then(() => res.json("Deaths cleared.")) 
    .catch(e => { console.log(e); res.status(400).json(e); });
});
module.exports = router;