const router = require("express").Router();
let Death = require("../models/death");

//note: the standard callback which passes back (err, result) is equal to resolving the promise with then() if it works,
//or catch() if it doesn't work

//additionally, you can use a try catch block with await

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
    //this can accept a filter using the url e.g. ?level=x
    Death.deleteMany(req.query)
        .then(() => res.json(`Deaths cleared.`))
        .catch(e => { console.log(e); res.status(400).json(e); });
});
module.exports = router;