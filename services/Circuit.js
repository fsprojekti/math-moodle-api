const Inp = require('./devices/sources/Inp');
const Out = require('./devices/drains/Out');
const Wire = require("./Wire");

class Circuit {
    constructor() {
        this.devices = [];
        this.wires = [];
    }

    //Calculate clcEvent for all devices
    //Repeat until number of devices with state 0 is not changing anymore
    clcEvent() {
        while (true) {
            let devicesWithState0 = this.devices.filter((device) => {
                return device.state === 0
            });
            devicesWithState0.forEach((device) => {
                device.clcEvent();
            });
            let newDevicesWithState0 = this.devices.filter((device) => {
                return device.state === 0;
            });
            if (newDevicesWithState0.length === devicesWithState0.length) {
                break;
            }
        }
        //Return current output values
        let out = this.devices.filter((device) => {
                return device instanceof Out
            }
        ).map((device) => {
            return device.getValue();
        });
        //Clear all devices
        this.devices.forEach((device) => {
                device.clear();
            }
        );
        return out;
    }

    toJSON() {
        // id counter
        let counter = 0;
        let c = {};
        c.devices = [];
        c.wires = [];
        this.devices.forEach((device) => {
            device.id = counter;
            c.devices.push({
                id: counter,
                type: device.constructor.name,
                inputs: device.inpPins.map((pin) => {
                    counter++;
                    pin.id = counter;
                    return {id: counter, negation: pin.negation};
                }),
                outputs: device.outPins.map((pin) => {
                    counter++;
                    pin.id = counter;
                    return {id: counter, negation: pin.negation};
                })
            });
            counter++;
        });
        this.wires.forEach((wire) => {
            counter++;
            c.wires.push({
                id: counter,
                source: wire.sourcePin.id,
                target: wire.targetPin.id
            })
        });
        //Clean id's
        this.devices.forEach((device) => {
            delete device.id;
            device.inpPins.forEach((pin) => {
                delete pin.id
            });
            device.outPins.forEach((pin) => {
                delete pin.id
            })
        });
        return c;
    }

    toSymbolic() {
        //Generate input symbols
        this.devices.filter((a) => {
            return a instanceof Inp
        }).forEach((d, ind) => {
            d.setSymbolic(ind);
        });
        //Generate out symbols
        let outs = [];
        this.devices.filter((a) => {
            return a instanceof Out
        }).forEach((d, ind) => {
            outs.push(d.toSymbolic(ind));
        });
        console.log(outs[0]);
        return (outs[0]);
    }

    simStep(inpVal) {
        //Set input values
        this.devices.filter(d => {
            return d instanceof Inp
        }).forEach((inp, i) => {
            inp.value = inpVal[i];
        })
        //Get output values
        let outValues = [];
        this.devices.filter(d => {
            return d instanceof Out
        }).forEach((out, i) => {
            outValues.push(out.getValue())
        })
        return outValues;
    }

    addWire(sourceDevice, targetDevice) {
        let wire = new Wire();
        wire = sourceDevice.addWireSource(wire);
        wire = targetDevice.addWireTarget(wire);
        this.wires.push(wire);
    }


}

module.exports = Circuit;