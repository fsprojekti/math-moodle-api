const CircuitFactory = require('../../services/CircuitFactory');

exports.generate = async (req, res) => {
    try {
        //Check if there is seed in the request if not set it to null
        let seed = req.query.seed || null;
        //Check if there is numInputs in the request
        let numInputs = req.query.numInputs || 2;
        //Check if there is numOutputs in the request
        let numOutputs = req.query.numOutputs || 2;
        //Check if there is numGates in the request
        let numGates = req.query.numGates || 5;
        //Check if there is numMemory in the request if not set to 4
        let numMemory = req.query.numMemory || 4;
        //Check if there is list of gates in the request if not set to null
        let listGates = req.query.listGates || null;
        //Check if there is list of memory in the request if not set to null
        let listMemory = req.query.listMemory || null;

        let circuitFactory = new CircuitFactory(seed);
        let circuit = circuitFactory.generate(numInputs, numOutputs, numGates, numMemory, listGates, listMemory);

        //let services = await serviceService.Service.find({})
        res.status(200).json({
            services: services
        })
    } catch (e) {
        return res.status(200).json({
            message: e
        });
    }
}