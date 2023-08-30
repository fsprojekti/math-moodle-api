//import crypto from "crypto";

class Wire {
    constructor(pinSource, pinTarget) {
        // this.id=crypto.randomBytes(10).toString('hex');
        this.pinSource = pinSource;
        this.pinTarget = pinTarget;
    }

    getValue() {
        return this.pinSource.getValue();
    }
}

module.exports = Wire;