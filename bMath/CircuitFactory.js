const DeviceFactory = require("./devices/DeviceFactory");
const Circuit = require("./Circuit");
const Out = require("./devices/drains/Out");
const Inp = require("./devices/sources/Inp");
const Wire = require("./Wire");
const seedrandom = require("seedrandom");

class CircuitFactory {
    constructor(seed) {
        if (seed) {
            this.seed = seed;
            this.rgen = seedrandom(this.seed);
        } else this.rgen = seedrandom();
    }

    resetGenerator() {
        this.rgen = seedrandom(this.seed);
    }

    genRandCircuitComb(numInp, numOut, numDevices) {
        let c = new Circuit();
        //Input devices
        for (let i = 0; i < numInp; i++) {
            c.devices.push(DeviceFactory.fromString("Inp"));
            // //Randomize out pin
            // if (this.genRandInt([0, 1]) === 0) {
            //     c.devices[c.devices.length - 1].outPins[0].negation = true;
            // }
        }
        //Output devices
        for (let i = 0; i < numOut; i++) {
            c.devices.push(DeviceFactory.fromString("Out"));
            //Randomize inp pin
            if (this.genRandInt([0, 1]) === 0) {
                c.devices[c.devices.length - 1].inpPins[0].negation = true;
            }
        }
        //Gates
        for (let i = 0; i < numDevices; i++) {
            c.devices.push(this.genRandGate());
            // //Randomize out pin
            // if (this.genRandInt([0, 1]) === 0) {
            //     c.devices[c.devices.length - 1].outPins[0].negation = true;
            // }
            //Randomize inp pins
            c.devices[c.devices.length - 1].inpPins.forEach((pin) => {
                if (this.genRandInt([0, 1]) === 0) {
                    pin.negation = true;
                }
            })
        }
        //Wire circuit
        //Gather all input pins
        let iPins = Array.prototype.concat.apply([], c.devices.map((device) => {
            return device.inpPins
        }));
        //Gather all output pins
        let oPins = Array.prototype.concat.apply([], c.devices.map((device) => {
            return device.outPins
        }));
        let oPinsExt = [];
        oPins.forEach((pin, ind) => {
            oPinsExt.push([ind, pin, 0]);
        });
        //Connect them randomly with wires
        //Copy outPins
        while (iPins.length > 0) {
            //Select random inpPin
            let ind1 = this.genRandInt([0, iPins.length - 1]);
            //Filter output connected devices to prevent feedback loops
            let conDevices = iPins[ind1].device.getOutputConnectedDevices();
            let buffer = oPinsExt.filter(row => {
                return !conDevices.includes(row[1].device)
            });
            //If pin is part of output device filter direct input connections
            if (iPins[ind1].device instanceof Out){
                buffer=buffer.filter(row=>{
                    return !(row[1].device instanceof Inp)
                })
            }
            buffer = buffer.slice();
            //Shuffle
            let shuffled = [];
            while (buffer.length > 0) {
                let ind = this.genRandInt([0, buffer.length - 1]);
                shuffled.push(buffer[ind]);
                buffer.splice(ind, 1);
            }
            //Sort pins by number of connections
            shuffled.sort((a, b) => {
                return a[2] - b[2];
            });
            //Crete wire
            let w = new Wire(shuffled[0][1], iPins[ind1],);
            iPins[ind1].addWire(w);
            shuffled[0][1].addWire(w);
            c.wires.push(w);
            oPinsExt.filter((row) => {
                return row[0] === shuffled[0][0];
            })[0][2]++;
            //Remove input pin
            iPins.splice(ind1, 1);
        }
        return c
    }

    genRandDevice() {
        let ind = this.genRandInt([0, DeviceFactory.listDevices().length - 1]);
        return DeviceFactory.fromString(DeviceFactory.listDevices()[ind]);
    }

    genRandGate() {
        let ind = this.genRandInt([0, DeviceFactory.listGates().length - 1]);
        return DeviceFactory.fromString(DeviceFactory.listGates()[ind]);
    }

    genRandInt(limits) {
        return Math.floor((limits[1]+1 - limits[0]) * this.rgen() + limits[0]);
    }
}

module.exports = CircuitFactory;