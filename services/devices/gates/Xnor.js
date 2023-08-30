let Device = require("../Device");

class Xnor extends Device {
    constructor() {
        super(null);
    }

    clcEvent() {
        //Check if all inputs have value break out of function if one of them return null
        for (let i = 0; i < this.pinsTarget.length; i++) {
            if (this.pinsTarget[i].wire.getValue() === null) {
                return;
            }
        }
        //Calculate logic XNOR function with multiple inputs for any length of inputs result should be true or false not 1 and 0
        let result = false;
        for (let i = 0; i < this.pinsTarget.length; i++) {
            result = result ^ this.pinsTarget[i].wire.getValue();
        }
        this.value = !result;
        this.state = 1;
    }

    toSymbolic(expression) {
        let out = "(";
        this.inpPins.forEach((pin) => {
            out += pin.toSymbolic();
            out += "\\equiv "
        });
        out = out.substr(0, out.length - 7);
        out += ")";
        return out;
    }

    getValue() {
        if (this.state === 0) {
            return null;
        } else {
            return this.value;
        }
    }


}

module.exports = Xnor;