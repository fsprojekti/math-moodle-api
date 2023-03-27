const CircuitFactory = require('../services/CircuitFactory');

exports.get = async (req, res) => {
    try {
        let circuit = await serviceCircuit.get();
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