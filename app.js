const express = require('express');
// const formidable = require('formidable');
const CircuitFactory = require("./bMath/CircuitFactory");
const fs = require('fs');

const app = express();

const fileUpload = require('express-fileupload');
app.use(fileUpload());

// const multipart = require('connect-multiparty');
// app.use(multipart({}));

const port = 3021;
app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/circuit/genCom', (req, res) => {
    let numInp = 2;
    let numOut = 1;
    let numDevices = 5;
    if (req.query.numInp) numInp = parseInt(req.query.numInp);
    if (req.query.numOut) numOut = parseInt(req.query.numOut);
    if (req.query.numDevices) numDevices = parseInt(req.query.numDevices);

    let circuitFactory = new CircuitFactory(req.query.seed);
    let c = circuitFactory.genRandCircuitComb(numInp, numOut, numDevices);


    let s = c.toSymbolic();
    while (!(s.includes("x_{0}") && s.includes("x_{1}") && s.includes("x_{2}"))) {
        c = circuitFactory.genRandCircuitComb(numInp, numOut, numDevices);
        s = c.toSymbolic();
    }


    res.status(201).send(s);
});

app.get('/plk/vaja1', (req, res) => {
    res.sendFile("/public/plkVaja1.html", {root: __dirname})
});

app.post('/plk/vaja1/upload', (req, res) => {

    const sampleFile = req.files.file;
    let name = 'PLK_LV1_' + req.body.id + ".pdf";
    sampleFile.mv("./uploads/"+name, function (err) {
        if (err) return res.status(500).send(err);
        res.send({savedAs: name});
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));






