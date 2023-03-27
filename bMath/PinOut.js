let Pin = require("./Pin");

class PinOut extends Pin {
    constructor(device) {
        super(device);
    }

    toSymbolic(expression) {
        if (this.negation) return "\\overline{"+this.device.toSymbolic(expression)+"}";
        return this.device.toSymbolic(expression)
    }

    getValue() {
        return this.negation ^ this.device.getValue();
    }
}

module.exports = PinOut;