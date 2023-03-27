const Device = require("../Device");

class Delay extends Device {
    constructor() {
        super();
        this.memory = true;
        this.state = false;
    }

    getValue() {
        return this.state;
    }

    clcState() {
        this.state = this.inpPins[0].getValue();
    }

    toSymbolic(expression) {
        let out="(";
        this.inpPins.forEach((pin)=>{
            out+=pin.toSymbolic();
            out+="\\cdot "
        });
        out=out.substr(0,out.length-6);
        out+=")";
        return out;
    }

    toExpression(expression) {
        let out="(";
        this.inpPins.forEach((pin)=>{
            out+=pin.toExpression();
            out+=" AND "
        });
        out=out.substr(0,out.length-5);
        out+=")";
        return out;
    }
}

module.exports = Delay