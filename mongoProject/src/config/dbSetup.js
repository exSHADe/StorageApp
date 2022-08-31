const config = require('./dbConfig.json')
const mongoose = require('mongoose')

const options = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.conncectionString, options)
.then(() => {
    console.log("Successfully connected to the database");    
})
.catch(err => {
    console.log('Could not connect to the database.');
    console.log('Error:\n' ,err)
    process.exit();
});
mongoose.Promise = global.Promise
module.exports = {
    Room : require('../models/roomModel'),
    Equipment : require('../models/equipmentModel'),
    Workplace : require('../models/workplaceModel')
}