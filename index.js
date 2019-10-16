const express = require("express");
const firebase = require("firebase");
const firebaseConfig = require("./config/firebase");

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const collUsers = db.collection("users");

// JWT
const config = require('./config/default');
const jwt = require('jsonwebtoken');

const token = jwt.sign(
    {
        id: 1
    },
    config.secret,
    { expiresIn: 300 }
);
console.log('token', token);
// END JWT

const app = express();
const bodyParser = require('body-parser');

// console.log("FIREBASE =>", firebase);
// console.log("FIREBASE CONFIG =>", firebaseConfig);

app.use(bodyParser.json());

app.post('/auth', (request, response, next) => { 
    console.log(request.body);
    collUsers
        .where('email', '==', request.body.email)
        .where('password', '==', request.body.password)
        .get()
        .then(user => {
            if (user.docs.length === 0){
                return response
                        .status(200)
                        .send({
                            code: 'not_found',
                            error: 'User not found' 
                        });
            }
            
            const [{ id }] = users.docs
            const token = jwt.sign(
                { id },
                config.secret,
                { expiresIn: 300 }
            );

            response.json({ token });
        })
        .catch(err => {
            console.log("Error getting document", err);
        });



});

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