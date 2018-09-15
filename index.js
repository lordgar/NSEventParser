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
    var v1 = inQuery.Value1.trim();
    var v2 = inQuery.Value2.trim();
    var eventTitle = v1 + ' (' + inParams.eid + ')';
    var eventSound = 'pushover';
    var eventMessage = v2;
    var eventPriority = -2;
    var sendMessage = true;
    var p = new Push( {
        user: USER,
        token: TOKEN,
    })
    
    switch (inParams.eid) {
        case 'ns-event':
            sendMessage = false;
            break;
        case 'ns-info':
            if(v1 === 'CGM Error Code')
            {
                eventPriority = 0;
                eventSound = 'alien'; 
            }
            sendMessage = true;
            break;
        case 'ns-warning':
            eventSound = 'gamelan';
            eventPriority = -1;
            sendMessage = true;
            break;
        case 'ns-urgent':
            eventSound = 'gamelan';
            eventPriority = -1;
            sendMessage = true;
            break;    
        default:
            break;
    }
      
    if(sendMessage){
      var msg = {
            message: eventMessage,	// required
            title: eventTitle,
            sound: eventSound,
            priority: eventPriority
          }
           
          p.send( msg, function( err, result ) {
            if ( err ) {
              throw err
            }
           
            console.log( result )
          })    
    } else {
        console.log('message not sent')
    }

}