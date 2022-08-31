const moongose = require('mongoose');

const equipmentSchema = moongose.Schema({
    category : { type: String,required: true},
    name : { type: String, required: true },
    description : { type: String, required: false},
    price : {type: Number, required:true}
});
equipmentSchema.set('toJSON', 
{
    virtuals: true,
    transform: function (doc, ret) 
    {
        delete ret._id;
    }
});

module.exports = moongose.model('equipment', equipmentSchema, 'equipment');