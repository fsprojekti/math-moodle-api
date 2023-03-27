let Device = require("../Device");
let PinInp = require("../../PinInp");
let PinOut = require("../../PinOut");

class Xor extends Device {
    constructor() {
        super([2,4]);
        this.inpPins = [new PinInp(this), new PinInp(this)];
        this.outPins=[new PinOut(this)];
    }

    toSymbolic(expression) {
        let out="(";
        this.inpPins.forEach((pin)=>{
            out+=pin.toSymbolic();
            out+="\\oplus "
        });
        out=out.substr(0,out.length-7);
        out+=")";
        return out;
    }

    getValue() {
        let out=0;
        this.inpPins.forEach(pin=>{
            if (pin.getValue()) out++
        })
        return out % 2 === 0;
    }
}

module.exports = Xor;