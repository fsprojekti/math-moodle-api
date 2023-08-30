let Pin = require("./Pin");

class PinTarget extends Pin {
    constructor(device) {
        super(device);
    }

    toSymbolic(expression) {
        if (this.negation) return "\\overline{" + this.wires[0].pinSource.toSymbolic(expression) + "}";
        return this.wire.pinSource.toSymbolic(expression)
    }

    getValue() {
        if (this.wire.pinSource.getValue() === null) return null;
        return this.negation ^ this.wire.getValue();
    }
}

module.exports = PinTarget;