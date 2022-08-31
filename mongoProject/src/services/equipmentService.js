const Equipment = require('../config/dbSetup').Equipment;

const create = async (props) => {
    const equipment = new Equipment(props);
    await equipment.save();
} 
const read = async (id) => {
    return await Equipment.findById(id);
}
const readAny = async () => {
    return await Equipment.find();
}
const update = async (id,props) => {
    const equipment = await Equipment.findById(id);
    if(props.category && equipment.category !== props.category) Object.assign(equipment,{category:props.category});
    if(props.name && equipment.name !== props.name) Object.assign(equipment,{name:props.name});
    if(props.description && equipment.description !== props.description) Object.assign(equipment,{description:props.description});
    if(props.price && equipment.price !== props.price) Object.assign(equipment,{price:props.price});  
    await equipment.save()
}
const _delete = async (id) => {
    await Equipment.findByIdAndRemove(id);
}

module.exports = {
    create,
    read,
    readAny,
    update,
    delete : _delete
}