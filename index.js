const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

//set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

const publicVapidKey = process.env.PUBLIC_VAPID;
const privateVapidKey = process.env.PRIVATE_VAPID;

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

//Subscribe route
app.post('/subscribe', (req, res) => {
    // get push sub object
    const subscription = req.body;

    //send 201 status - res created
    res.status(201).json({});

    //create payload
    const payload = JSON.stringify({ title: 'PUSH TEST' }); 

    //pass object into the send notification func
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});


const port = 5000;
app.listen(port, () => { console.log(`server started at port ${port}`); });