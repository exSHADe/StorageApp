const exps = require('express');
const bp = require('body-parser');

const server = exps();
const port = process.env.PORT || 3001;

const path = require('path')

server.use(bp.urlencoded({extended:true}))
server.use(bp.json())

const cors = require("cors")
server.use(cors())

const rooms = require('./routes/roomRoute')
const equipments = require('./routes/equipmentRoute')
const workplaces = require('./routes/workplaceRoute')

server.use('/api/rooms',rooms);
server.use('/api/equipments',equipments);
server.use('/api/workplaces',workplaces);

server.use(exps.static(path.join(__dirname,'./buildReact')))
server.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./buildReact','index.html'))
})

server.listen(port, () => {
    console.log('Server listening on port ' + port);
})
