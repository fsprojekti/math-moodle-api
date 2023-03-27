let Device = require("../Device");
let PinInp = require("../../PinInp");
let PinOut = require("../../PinOut");

class Nor extends Device {
    constructor() {
        super([2,4]);
        this.inpPins = [new PinInp(this), new PinInp(this)];
        this.outPins=[new PinOut(this)];
    }

    toSymbolic(expression) {
        let out="(";
        this.inpPins.forEach((pin)=>{
            out+=pin.toSymbolic();
            out+="\\downarrow "
        });
        out=out.substr(0,out.length-11);
        out+=")";
        return out;
    }

    getValue() {
        this.inpPins.forEach(pin=>{
            if (pin.getValue()) return false
        })
        return true
    }
}

module.exports = Nor;