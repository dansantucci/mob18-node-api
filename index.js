const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.get('/',(req, res) => {
    console.log('Default Route');
    res.send("Olá mundo!");
});
app.get('/dev/:name',(req, res) => {
    console.log('Dev Route');
    res.send("Olá DEV :D" + req.params.name);
});
app.get('/users', (request, response, next) => {
    // console.log("REQUEST ==>",request);
    // console.log("RESPONSE ==>",response);

    // response.sendStatus(200);
    console.log('Users Route with JSON');
    response.json({ success: true });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

console.log("APP RUNNING --->");
console.log("---> ",process.env.NODE_ENV);