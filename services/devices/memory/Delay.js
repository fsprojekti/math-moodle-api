const Device = require("../Device");

class Delay extends Device {
    constructor(initialValue) {
        super(initialValue);
        this.valueNext = 0;
        if (initialValue === undefined) initialValue = 0;
        this.value = initialValue;
    }

    clcEvent() {
        //Check if all inputs have value break out of function if one of them return null
        if (this.pinsTarget[0].wire.getValue() === null) {
            return;
        }
        this.valueNext = this.pinsTarget[0].wire.getValue();
        this.state = 1;
    }

    clear() {
        this.state = 0;
        this.value = this.valueNext;
    }

    reset() {
        this.state = 0;
        this.value = this.initialValue;
    }

    toSymbolic(expression) {
        return "(" + this.pinsSource[0].toSymbolic() + ")";

    }

    toExpression(expression) {
        let out = "(";
        this.pinsSource.forEach((pin) => {
            out += pin.toExpression();
            out += " AND "
        });
        out = out.substr(0, out.length - 5);
        out += ")";
        return out;
    }

    getValue() {
        return this.value;
    }


}

module.exports = Delay