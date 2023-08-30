const DeviceFactory = require("./devices/DeviceFactory");
const Circuit = require("./Circuit");
const Out = require("./devices/drains/Out");
const Inp = require("./devices/sources/Inp");
const Wire = require("./Wire");
const seedRandom = require("seedrandom");

class CircuitFactory {
    constructor(seed) {
        if (seed) {
            this.seed = seed;
            this.rgen = seedRandom(this.seed);
        } else this.rgen = seedRandom();
    }

    resetGenerator() {
        this.rgen = seedRandom(this.seed);
    }

    generate(numInp, numOut, numGates, numMemory, listGates, listMemory) {
        let c = new Circuit();

        //Input devices
        for (let i = 0; i < numInp; i++) {
            c.devices.push(DeviceFactory.fromString("Inp"));
        }
        //Output devices
        for (let i = 0; i < numOut; i++) {
            c.devices.push(DeviceFactory.fromString("Out"));
        }
        //Gates
        for (let i = 0; i < numGates; i++) {
            c.devices.push(this.genRandGate(listGates));
        }
        //Memory
        for (let i = 0; i < numMemory; i++) {
            c.devices.push(this.genRandMemory(listMemory));
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

        while (iPins.length) {
            //Select random inpPin
            let ind1 = this.genRandInt([0, iPins.length - 1]);


        }
        return c
        //TODO randomise pins negation
    }

    genRandDevice() {
        let ind = this.genRandInt([0, DeviceFactory.listDevices().length - 1]);
        return DeviceFactory.fromString(DeviceFactory.listDevices()[ind]);
    }

    genRandGate(listGates) {
        if (listGates === null) listGates = DeviceFactory.listGates();
        let ind = this.genRandInt([0, listGates.length - 1]);
        return DeviceFactory.fromString(listGates()[ind]);
    }

    genRandMemory(listMemory) {
        if (listMemory === null) listMemory = DeviceFactory.listMemory();
        let ind = this.genRandInt([0, listMemory.length - 1]);
        return DeviceFactory.fromString(listMemory[ind]);
    }

    genRandInt(limits) {
        return Math.floor((limits[1] + 1 - limits[0]) * this.rgen() + limits[0]);
    }

    genRandBool() {
        return this.genRandInt([0, 1]) === 0;
    }


    // dfs_traversal(startDevice, targetDevice, visited, devicesGraph) {
    //     if (startDevice === targetDevice) {
    //         return [startDevice];
    //     }
    //
    //     visited.add(startDevice);
    //
    //     if (devicesGraph[startDevice]) {
    //         for (let nextDevice of devicesGraph[startDevice]) {
    //             if (!visited.has(nextDevice)) {
    //                 let path = this.dfs_traversal(nextDevice, targetDevice, visited, devicesGraph);
    //                 if (path.length) {
    //                     return [startDevice].concat(path);
    //                 }
    //             }
    //         }
    //     }
    //
    //     return [];
    // }
    //
    // has_memory_device_in_loop(loopDevices, memoryDevices) {
    //     for (let device of loopDevices) {
    //         if (memoryDevices.includes(device)) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
}

module.exports = CircuitFactory;