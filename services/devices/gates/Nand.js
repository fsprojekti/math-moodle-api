let Device = require("../Device");
let PinInp = require("../../PinInp");
let PinOut = require("../../PinOut");

class Nand extends Device {
    constructor() {
        super([2,4]);
        this.inpPins = [new PinInp(this), new PinInp(this)];
        this.outPins=[new PinOut(this)];
    }

    toSymbolic(expression) {
        let out="(";
        this.inpPins.forEach((pin)=>{
            out+=pin.toSymbolic();
            out+="\\uparrow "
        });
        out=out.substr(0,out.length-9);
        out+=")";
        return out;
    }

    getValue() {
        this.inpPins.forEach(pin=>{
            if (!pin.getValue()) return true
        })
        return false
    }
}

module.exports = Nand;