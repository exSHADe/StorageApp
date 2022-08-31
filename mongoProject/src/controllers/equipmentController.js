const equipmentService = require('../services/equipmentService')
const Ajv = require('ajv')
const schema = require('./equipmentSchema.json')

const ajv = new Ajv({allErrors:true})

const create = async (req,res,next) => {
    const validate = ajv.compile(schema)
    let temp = validate(req.body)
    if(temp)
        await equipmentService.create(req.body)
         .then(() => res.status(201).json({}))
         .catch(err => next(err));
}
const read = async (req,res,next) => {
    await equipmentService.read(req.params.id)
        .then(equipment => equipment ? res.status(200).json(equipment) : res.status(404).json({message: "Not found"}) )
        .catch(err => next(err));
}
const readAny = async (req,res,next) => {
    await equipmentService.readAny()
        .then(workplaces => res.status(200).json(workplaces))
        .catch(err => next(err));
}
const update = async (req,res,next) => {
    await equipmentService.update(req.params.id,req.body)
        .then(equipment => equipment? res.status(202).json(equipment): res.status(400))
        .catch(err => next(err));
}
const _delete = async (req,res,next) => {
    await equipmentService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports = {
    create,
    read,
    readAny,
    update,
    delete: _delete
};