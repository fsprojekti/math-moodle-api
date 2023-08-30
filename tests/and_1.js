
const Circuit = require("../services/Circuit");
const DeviceFactory = require("../services/devices/DeviceFactory");

let circuit = new Circuit();
circuit.devices.push(DeviceFactory.fromString("Inp"));
circuit.devices.push(DeviceFactory.fromString("Inp"));
circuit.devices.push(DeviceFactory.fromString("Out"));
circuit.devices.push(DeviceFactory.fromString("And"));

circuit.addWire(circuit.devices[0], circuit.devices[3]);
circuit.addWire(circuit.devices[1], circuit.devices[3]);
circuit.addWire(circuit.devices[3], circuit.devices[2]);

circuit.devices[0].initialValue = 0;
circuit.devices[1].initialValue = 0;
console.log("0 0 | "+circuit.clcEvent());

circuit.devices[0].initialValue = 0;
circuit.devices[1].initialValue = 1;
console.log("0 1 | "+circuit.clcEvent());

circuit.devices[0].initialValue = 1;
circuit.devices[1].initialValue = 0;
console.log("1 0 | "+circuit.clcEvent());

circuit.devices[0].initialValue = 1;
circuit.devices[1].initialValue = 1;
console.log("1 1 | "+circuit.clcEvent());









