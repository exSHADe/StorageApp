const moongose = require('mongoose');

const workplaceSchema = moongose.Schema({
    type:{type:String, required:true},
    components: {type:Array }
});
workplaceSchema.set('toJSON', 
{
    virtuals: true,
    transform: function (doc, ret) 
    {
        delete ret._id;
    }
});

module.exports = moongose.model('workplace', workplaceSchema, 'workplace');