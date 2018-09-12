const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());

app.get('/', (req,res) =>{
    res.send('NSEventParser')
})

app.post('/event/:eid', (req, res) => {
    console.log(`NS Event: ${req.params.eid}`);
    const bodystring = JSON.stringify(req.body)
    console.log(bodystring);
    res.status(200).send(bodystring);
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))