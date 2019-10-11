const express = require("express");
const firebase = require("firebase");
const firebaseConfig = require("./config/firebase");

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const collUsers = db.collection("users");

const app = express();

// console.log("FIREBASE =>", firebase);
// console.log("FIREBASE CONFIG =>", firebaseConfig);

app.get('/',(req, res) => {
    console.log('Default Route');
    res.send("Olá mundo!");
});
app.get('/dev/:name',(req, res) => {
    console.log('Dev Route');
    res.send("Olá DEV :D" + req.params.name);
});
app.get('/users/:id', (request, response, next) => {
    if (request.params.id) {
        collUsers.doc(request.params.id).get()
        .then(user => {
            response.json(user.data());
        })
        .catch(err => {
            console.log("Error getting document", err);
        });
    }
});
app.get('/users', (request, response, next) => {
    collUsers.get().then(coll => {
        let data = [];
        coll.docs.map(doc => {
            data.push(doc.data());
        })
        response.json(data);
    });
    // response.sendStatus(200);
    // console.log('Users Route with JSON');
    // response.json({ success: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

console.log("APP RUNNING --->");
console.log("---> ",process.env.NODE_ENV);