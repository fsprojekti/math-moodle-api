class Pin {
    constructor(node) {
        this.device=node;
        this.negation=false;
        this.wires=[];
    }

    toSymbolic(expression){
        if (this.negation) return "\\overline{"+expression+"}";
        return expression;
    }

    addWire(wire){
        this.wires.push(wire);
    }

    getValue(){

    }
}

module.exports=Pin;