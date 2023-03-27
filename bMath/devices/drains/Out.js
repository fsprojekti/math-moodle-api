let Device = require("../Device");
let PinInp = require("../../PinInp");

class Out extends Device {
    constructor() {
        super([1, 1]);
        this.inpPins = [new PinInp(this)]
    }

    toSymbolic(expression) {
        return "y_{"+expression+"}="+this.inpPins[0].toSymbolic(expression);
    }

    getValue() {
        return this.inpPins[0].getValue();
    }
}

module.exports = Out;