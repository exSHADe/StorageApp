const moongose = require('mongoose');

const roomSchema = moongose.Schema({
    building : { type: String , required: true},
    building_shortcut : { type: String , required: true},
    room_ID : { type: String , required: true },
    type : { type: Boolean , required: true},
    accessories : {type: Array }
});
roomSchema.set('toJSON', 
{
    virtuals: true,
    transform: function (doc, ret) 
    {
        delete ret._id;
    }
});

module.exports = moongose.model('room', roomSchema, 'room');