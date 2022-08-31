//Simple queries
db.equipment
    .find({"name": {$regex: /CU-/}})
    .sort({price:-1})
    .limit(50)
    
db.equipment
    .find({"category":"education"})
    .where("price").lt(2400)
    .sort({ name:1 })

db.room
    .find({"building_shortcut":"CTCS"})
    .count()

db.room
    .find({"building": {$regex: /Tech/}})
    .sort({room_ID:1})

//Extended queries

db.equipment
    .find({$or:[{"category":"education"},{"name":{$regex: /^Monitor/}}]})
    .where("price":{"$gt":500,"$lt":1500})
    .sort({"price":1})
    .limit(30)

db.room
    .find({$and:[{"building_shortcut":"IACS"},{"type":false}]})
    .sort({"room_ID":1 })
    .limit(50)


db.equipment
    .find({"price":{$in: [5400,7200]},"category":"education"})
    .limit(10)
    

db.equipment
    .find({"description": {$regex: /managing/},"name": {$regex: /CU-/}})
    .limit(20)
    