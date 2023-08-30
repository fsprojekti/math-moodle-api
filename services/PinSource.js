let Pin = require("./Pin");

class PinSource extends Pin {
    constructor(device) {
        super(device);
    }

    toSymbolic(expression) {
        if (this.negation) return "\\overline{" + this.device.toSymbolic(expression) + "}";
        return this.device.toSymbolic(expression)
    }

    getValue() {
        if (this.device.getValue() === null) return null;
        return this.negation ^ this.device.getValue();
    }
}

module.exports = PinSource;