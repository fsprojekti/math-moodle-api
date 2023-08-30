const Device = require("../Device");
const PinSource = require("../../PinSource");

class Inp extends Device {
    constructor() {
        super(0);
    }

    clcEvent() {
        this.value = this.initialValue;
        this.state = 1;
    }

    setSymbolic(ind) {
        this.symbol = "x_{" + ind + "}";
    }

    toSymbolic(expression) {
        return this.symbol;
    }

    getValue() {
        return this.value
    }

}

module.exports = Inp;