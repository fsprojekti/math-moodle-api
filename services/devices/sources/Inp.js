const Device = require("../Device");
const PinOut = require("../../PinOut");

class Inp extends Device {
    constructor() {
        super([0, 0]);
        this.outPins = [new PinOut(this)];
        this.value=false;
    }

    setSymbolic(ind){
        this.symbol="x_{"+ind+"}";
    }

    toSymbolic(expression) {
        return this.symbol;
    }

    getValue() {
        return this.value
    }

}

module.exports=Inp;