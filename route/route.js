const router = require('express').Router()
const fire = require('./fire')
const bodyParser = require('body-parser')
const db = fire.database()
const moment = require('moment-timezone');
const fetch = require("node-fetch");
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// all data
router.get('/api/:id', (req, res)=>{
    db
    .ref(req.params.id)
    .once("value", snapshot => {
        res.send(snapshot.val())
        res.end()
    })
})
//  update result
router.post('/api/:id/result', (req, res)=>{
    db.
    ref(`${req.params.id}/result`)
    .update({
        humidity: parseInt(req.body.humidity),
        water: parseInt(req.body.water)
    })
    .then(() => res.end())
})
//  add log
router.get('/api/:id/log/:theme', (req, res)=>{
    const date = moment().tz("Asia/Makassar");
    const description = req.params.theme == "water" ? "The plant is watered" :  req.params.theme == "move" ? "Suspicious movement detected!" : "Water tank below 50%";
    const title = req.params.theme == "water" ? "Watering report" :  req.params.theme == "move" ? "Is that you?" : "Hey, water runs out";
    const theme = req.params.theme == "water" ? "log1" : "log2";
    db.
    ref(`${req.params.id}/log/${date.format("MMDDYYYY")}/${date.format("hhmmss")}`)
    .update({
        date: date.format(),
        description: description,
        theme: theme
    })

    db
    .ref(req.params.id)
    .once("value", snapshot => {
        res.send(snapshot.val())
        snapshot.val().token.forEach(token => {
            fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "to": token,
                    "title":title,
                    "body": description
                }),
            })
        });
    })
    .then(() => res.end()) 
})
// get control
router.get('/api/:id/control', (req, res)=>{
    db
    .ref(req.params.id+"/controls")
    .once("value", snapshot => {
        res.send(snapshot.val())
        res.end()
    })
})
// set ring control
router.get('/api/:id/control/ring', (req, res)=>{
    db
    .ref(`${req.params.id}/controls`)
    .update({
        ring: 0
    })
    .then(() => res.end())
})
// set water control
router.get('/api/:id/control/water', (req, res)=>{
    db
    .ref(`${req.params.id}/controls`)
    .update({
        water: 0
    })
    .then(() => res.end())
})
// get settings
router.get('/api/:id/setting', (req, res)=>{
    db
    .ref(req.params.id+"/settings")
    .once("value", snapshot => {
        res.send(snapshot.val())
        res.end()
    })
})
module.exports = router