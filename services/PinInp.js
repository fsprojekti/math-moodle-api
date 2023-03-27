let Pin = require("./Pin");

class PinInp extends Pin {
    constructor(device) {
        super(device);
    }

    toSymbolic(expression) {
        if (this.negation) return "\\overline{"+this.wires[0].sourcePin.toSymbolic(expression)+"}";
        return this.wires[0].sourcePin.toSymbolic(expression)
    }

    getValue() {
        return this.negation ^ this.wires[0].sourcePin.getValue();
    }
}

module.exports = PinInp;