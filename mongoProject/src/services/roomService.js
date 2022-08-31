const Room = require('../config/dbSetup').Room;

const create = async (props) => {
    const room = new Room(props);
    await room.save();
} 
const read = async (id) => {
    return await Room.findById(id);
}
const readAny = async () => {
    return await Room.find().sort({building_shortcut:1})
}
const update = async (id,props) => {
    const room = await Room.findById(id);
    if(props.building && room.building !== props.building) Object.assign(room,{building:props.building});
    if(props.building_shortcut && room.building_shortcut !== props.building_shortcut) Object.assign(room,{building_shortcut:props.building_shortcut});
    if(props.room_ID && room.room_ID !== props.room_ID) Object.assign(room,{room_ID:props.room_ID});
    if(props.type && room.type !== props.type) Object.assign(room,{type:props.type});  
    Object.assign(room,{accessories:props.accessories})
    await room.save()
}
const _delete = async (id) => {
    await Room.findByIdAndRemove(id);
}

module.exports = {
    create,
    read,
    readAny,
    update,
    delete : _delete
}