const fetch = require("node-fetch");

//node fetch: brings front-end fetch() or axios requests to the backend
const wakeUp = (url, interval) => {
    const ms = interval * 60000;
    setTimeout(() => {
        try {
            fetch(url).then(() => console.log(`Fetching ${url}.`));
        }
        catch (e) {
            console.log(e.message);
        }
        wakeUp(url, interval);
    }, ms);
};

module.exports = wakeUp;