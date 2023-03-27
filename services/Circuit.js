const Inp = require('./devices/sources/Inp');
const Out = require('./devices/drains/Out');

class Circuit {
    constructor() {
        this.devices = [];
        this.wires = [];
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
        }).forEach((inp,i)=>{
            inp.value=inpVal[i];
        })
        //Get output values
        let outValues=[];
        this.devices.filter(d => {
            return d instanceof Out
        }).forEach((out,i)=>{
            outValues.push(out.getValue())
        })
        return outValues;
    }
}

module.exports = Circuit;