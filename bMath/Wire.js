//import crypto from "crypto";

class Wire {
    constructor(sourcePin, targetPin) {
        // this.id=crypto.randomBytes(10).toString('hex');
        this.sourcePin = sourcePin;
        this.targetPin = targetPin;
    }
}

module.exports = Wire;