
/* router.route("/add").post((req, res) => {

    const newCompletion = new Completion(req.body);

    newCompletion.save()
        .then(() => {
            console.log("Level Completed: ", newCompletion);
            res.json("Level completion added successfully.");
        })
        .catch(e => { console.log(e); res.status(400).json(e); });
});

router.route("/clear").delete((req, res) => {
    //this can accept a filter using the url e.g. ?level=x
    Completion.deleteMany(req.query)
        .then(() => res.json(`Completions cleared.`))
        .catch(e => { console.log(e); res.status(400).json(e); });
}); */