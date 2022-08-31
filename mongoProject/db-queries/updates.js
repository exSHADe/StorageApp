db.room.insert
    ({
    "building" : "Main Departament of Information Technology and Cybernetics",
    "building_shortcut" : "MITDC",
	"room_ID": "R3M",
	"type": true,
	"useGiveDate":new Date(1642702954000),
    "accessories":
        [
            {
                "_id":"61e4be71a1b9513d4c531e1b",
                "type":"workspace",
                "amount":1
            },
            {
                "_id":"61e4be71a1b9513d4c531e18",
                "type":"workspace",
                "amount":1
            },
            {
                "_id":"61e4be71a1b9513d4c531e1a",
                "type":"workspace",
                "amount":15
            },
            {
                "_id":"61e4bae1a1b9513d4c531e06",
                "type":"equipment",
                "amount":8
            }
        ]
    })
    
db.room.find({room_ID:"R3M"})
    
db.room
    .updateOne({room_ID:"R3M"},{$unset:{"useGiveDate":
    {$cond: { if: { "useGiveDate": 
    {$gte: new Date(1610582400000)}}}}})

db.equipment
    .updateOne({_id:ObjectId("61e4bae1a1b9513d4c531e06")}
    ,{$mul: {"price":Number(1.4)}})

db.room
    .updateOne({room_ID:"R3M"},
    {$rename: {"building_shortcut":"shortcut"})
    
db.equipment
    .updateOne({_id:ObjectId("61e4bae1a1b9513d4c531e09")},
    {$set:{"price":{$cond:{if: {$max:{"price":420}}, then 1600 ,else "$price"}} }})
   
    
    
    
db.room
    .updateOne({room_ID:"R3M"},{$addToSet: {"accessories" : {
                "_id":"61e4bae1a1b9513d4c531e14",
                "type":"workspace",
                "amount":3
            }})
            
db.room.deleteOne({accessories:{$exists:true, $type: 'array', $size: 5 }})

