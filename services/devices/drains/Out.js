let Device = require("../Device");
let PinTarget = require("../../PinTarget");

class Out extends Device {
    constructor() {
        super(null);
        this.valueOld = null;
    }

    clcEvent() {
        this.value = this.pinsTarget[0].getValue();
        if (this.value !== null) this.state = 1;
    }

    toSymbolic(expression) {
        return "y_{" + expression + "}=" + this.pinsTarget[0].toSymbolic(expression);
    }

    getValue() {
        return this.value
    }

    clear() {
        this.valueOld = this.value;
        super.clear();
    }
}

module.exports = Out;