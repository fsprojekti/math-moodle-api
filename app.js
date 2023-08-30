// const express = require('express');
// const cors = require('cors');
//
// const app = express();
// app.use(express.json());
// app.use(cors());
//
// const port = 3000;
//
// const circuitRoutes = require('./api/routes/circuit');
// app.use('/circuit', circuitRoutes);
//
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const Circuit = require("./services/Circuit");
const DeviceFactory = require("./services/devices/DeviceFactory");

let circuit = new Circuit();
circuit.devices.push(DeviceFactory.fromString("Inp"));
circuit.devices.push(DeviceFactory.fromString("Out"));
circuit.devices.push(DeviceFactory.fromString("Delay"));

circuit.addWire(circuit.devices[0], circuit.devices[2]);
circuit.addWire(circuit.devices[2], circuit.devices[1]);

circuit.devices[0].initialValue = 0;
circuit.clcEvent();
console.log(circuit.devices[0].initialValue+" | "+circuit.devices[2].value+" | "+circuit.devices[1].value);


circuit.devices[0].initialValue = 1;
circuit.clcEvent();
console.log(circuit.devices[0].initialValue+" | "+circuit.devices[2].value+" | "+circuit.devices[1].value);


circuit.devices[0].initialValue = 0;
circuit.clcEvent();
console.log(circuit.devices[0].initialValue+" | "+circuit.devices[2].value+" | "+circuit.devices[1].value);


circuit.devices[0].initialValue = 0;
circuit.clcEvent();
console.log(circuit.devices[0].initialValue+" | "+circuit.devices[2].value+" | "+circuit.devices[1].value);

