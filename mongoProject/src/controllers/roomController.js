const roomService = require('../services/roomService')

const create = async (req,res,next) => {
    await roomService.create(req.body)
        .then(() => res.status(201).json({}))
        .catch(err => next(err));
}
const read = async (req,res,next) => {
    await roomService.read(req.params.id)
        .then(room => room ? res.status(200).json(room) : res.status(404).json({message: "Not found"}) )
        .catch(err => next(err));
}
const readAny = async (req,res,next) => {
    await roomService.readAny()
        .then(rooms => res.status(200).json(rooms))
        .catch(err => next(err));
}
const update = async (req,res,next) => {
    await roomService.update(req.params.id,req.body)
        .then(room => room? res.status(202).json(room): res.status(400))
        .catch(err => next(err));
}
const _delete = async (req,res,next) => {
    await roomService.delete(req.params.id)
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