const workplaceService = require('../services/workplaceService')

const create = async (req,res,next) => {
    await workplaceService.create(req.body)
        .then(() => res.status(201).json({}))
        .catch(err => next(err));
}
const read = async (req,res,next) => {
    await workplaceService.read(req.params.id)
        .then(workplace => workplace ? res.status(200).json(workplace) : res.status(404).json({message: "Not found"}) )
        .catch(err => next(err));
}
const readAny = async (req,res,next) => {
    await workplaceService.readAny()
        .then(workplaces => res.status(200).json(workplaces))
        .catch(err => next(err));
}
const update = async (req,res,next) => {
    await workplaceService.update(req.params.id,req.body)
        .then(workplace => workplace ? res.status(202).json(workplace): res.status(400))
        .catch(err => next(err));
}
const _delete = async (req,res,next) => {
    await workplaceService.delete(req.params.id)
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