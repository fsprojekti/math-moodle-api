const Circuit = require("../services/Circuit");
const DeviceFactory = require("../services/devices/DeviceFactory");

let circuit = new Circuit();
circuit.devices.push(DeviceFactory.fromString("Inp"));
circuit.devices.push(DeviceFactory.fromString("Out"));
circuit.devices.push(DeviceFactory.fromString("Delay"));

circuit.addWire(circuit.devices[0], circuit.devices[2]);
circuit.addWire(circuit.devices[2], circuit.devices[1]);

circuit.devices[0].initialValue = 0;
console.log(circuit.devices[0].initialValue+" | "+circuit.clcEvent());

circuit.devices[0].initialValue = 1;
console.log(circuit.devices[0].initialValue+" | "+circuit.clcEvent());

circuit.devices[0].initialValue = 0;
console.log(circuit.devices[0].initialValue+" | "+circuit.clcEvent());

circuit.devices[0].initialValue = 0;
console.log(circuit.devices[0].initialValue+" | "+circuit.clcEvent());
