//import crypto from "crypto";

const PinSource = require("../PinSource");
const PinTarget = require("../PinTarget");

class Device {
    constructor(initialValue) {
        //this.id=crypto.randomBytes(10).toString('hex');
        this.pinsSource = [];
        this.pinsTarget = [];
        this.value = null;
        if (initialValue === undefined) {
            initialValue = 0;
        }
        this.initialValue = initialValue;
        //States of devices
        //0 - not calculated
        //1 - calculated
        this.state = 0;
    }

    clear() {
        this.state = 0;
        this.value = this.initialValue;
    }

    reset() {
        this.value = null
        this.state = 0;
    }

    clcEvent() {
    }

    toSymbolic(expression) {
        return expression;
    }

    addWireSource(wire) {
        let pin = new PinSource(this);
        pin.wire = wire;
        this.pinsSource.push(pin);
        wire.pinSource=pin;
        return wire;
    }

    addWireTarget(wire) {
        let pin = new PinTarget(this);
        pin.wire = wire;
        this.pinsTarget.push(pin);
        wire.pinTarget=pin;
        return wire;

    }
}

module.exports = Device;