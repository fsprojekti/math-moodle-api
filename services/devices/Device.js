

//import crypto from "crypto";

class Device {
    constructor(limitNumInp) {
        //this.id=crypto.randomBytes(10).toString('hex');
        this.inpPins = [];
        this.outPins = [];
        this.limitNumInp=limitNumInp;
    }

    toSymbolic(expression){
        return expression;
    }

    getOutputConnectedDevices(){
        let devices=[];
        devices.push(this);
        this.outPins.forEach((pin)=>{
            pin.wires.forEach((wire)=>{
                let d=wire.targetPin.device.getOutputConnectedDevices();
                devices=devices.concat(d);
            })
        });
        return devices;
    }

    getValue(){
        return null;
    }

}

module.exports = Device;