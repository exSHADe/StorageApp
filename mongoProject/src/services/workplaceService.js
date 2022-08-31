const Workplace = require('../config/dbSetup').Workplace;

const create = async (props) => {
    const workplace = new Workplace(props);
    await workplace.save();
} 
const read = async (id) => {
    return await Workplace.findById(id);
}
const readAny = async () => {
    return await Workplace.find();
}
const update = async (id,props) => {
    const workplace = await Workplace.findById(id);
    if(props.type && workplace.type !== props.type) Object.assign(workplace,{type:props.type});
    Object.assign(workplace,{components:props.components})
    await workplace.save()
}
const _delete = async (id) => {
    await Workplace.findByIdAndRemove(id);
}

module.exports = {
    create,
    read,
    readAny,
    update,
    delete : _delete
}