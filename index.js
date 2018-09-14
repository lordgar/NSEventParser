const express = require('express');
var Push = require('pushover-notifications');
const app = express();
const PORT = process.env.PORT || 5000
const USER = process.env.PUSHOVER_USER
const TOKEN = process.env.PUSHOVER_TOKEN

app.use(express.json());

app.get('/', (req,res) =>{
    res.send('NSEventParser')
})

app.post('/event/:eid', (req, res) => {
    console.log(`NS Event: ${req.params.eid}`);
    console.log(req.params);
    console.log(req.query);
    parseForPushover(req.params, req.query);
    res.status(200).send('NSEventParser');
})

.listen(PORT, () => console.log(`Listening on ${ PORT }`))

function parseForPushover(inParams, inQuery) {
    var eventTitle = inQuery.Value1.trim()
    var p = new Push( {
        user: USER,
        token: TOKEN,
        // httpOptions: {
        //   proxy: process.env['http_proxy'],
        //},
        // onerror: function(error) {},
        // update_sounds: true // update the list of sounds every day - will
        // prevent app from exiting.
      })
      var msg = {
        // These values correspond to the parameters detailed on https://pushover.net/api
        // 'message' is required. All other values are optional.
        message: 'put message data here',	// required
        title: eventTitle,
        sound: 'magic',
        priority: 1
      }
       
      p.send( msg, function( err, result ) {
        if ( err ) {
          throw err
        }
       
        console.log( result )
      })

}