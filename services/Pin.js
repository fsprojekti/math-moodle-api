class Pin {
    constructor(node) {
        this.device=node;
        this.negation=false;
        this.wire=null;
    }

    toSymbolic(expression){
        if (this.negation) return "\\overline{"+expression+"}";
        return expression;
    }

    getValue(){

    }
}

module.exports=Pin;