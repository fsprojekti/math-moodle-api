const Inp = require("./sources/Inp");
const Out = require("./drains/Out");
const And = require("./gates/And");
const Or = require("./gates/Or");
const Nand = require("./gates/Nand");
const Nor = require("./gates/Nor");
const Xor = require("./gates/Xor");
const Xnor = require("./gates/Xnor");
const Delay = require("./memory/Delay");

class DeviceFactory {
    constructor() {


    }

    static fromString(string) {
        switch (string) {
            case "Inp": {
                return new Inp();
            }
            case "Out": {
                return new Out();
            }
            case "And": {
                return new And();
            }
            case "Or": {
                return new Or();
            }
            case "Nand": {
                return new Nand();
            }
            case "Nor": {
                return new Nor();
            }
            case "Xor": {
                return new Xor();
            }
            case "Xnor": {
                return new Xnor();
            }
            case "Delay": {
                return new Delay();
            }
            default : {
                return null;
            }
        }
    }

    static listDevices() {
        return ['Inp', 'Out', 'And', 'Or','Nand','Nor','Xor','Xnor','Delay'];
    }

    static listGates() {
        return ['And', 'Or', 'Nand','Nor','Xor','Xnor'];
    }

    static listMemory() {
        return ['Delay'];
    }


}

module.exports=DeviceFactory;