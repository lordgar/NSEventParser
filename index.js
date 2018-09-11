const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());

app.get('/', (req,res) =>{
    res.send('NSEventParser')
})

app.post('/event/:eid', (req, res) => {
    console.log(`NS Event: ${req.params.eid}`)
    console.log(`body: ${req.body}`)
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))