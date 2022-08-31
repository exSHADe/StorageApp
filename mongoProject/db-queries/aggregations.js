db.equipment
    .aggregate
    (
        [
            {$group : {_id:"$category", count:{$sum:1}}},
            {$project: {count:1}},
            {$sort: {count:-1}}
        ]
    )

db.equipment
    .aggregate
    (
        [   {$match: {"category":"Peripheral device"}},
            {$match: {"name": {$regex: /CU-/}}},
            {$group: { _id: "Average price for central unit", avg:{$avg: "$price"}}},
            
        ]
    )

db.workplace
    .aggregate
    (
        [
            {$unwind: "$compontents"},
            {$lookup: {
                   from: "equipment",
                   localField: "compontents._id",
                   foreignField: "_id",
                   as: "tempComponents"
                 }},
            {$unwind: "$tempComponents"},
            {$addFields: {"compontents.category":"$tempComponents.category"}},
            {$addFields: {"compontents.name":"$tempComponents.name"}},
            {$addFields: {"compontents.description":"$tempComponents.description"}},
            {$addFields: {"compontents.price":"$tempComponents.price"}},
            {$group: { _id: "$type","compont":{$push:"$compontents"} }}
        ]
    )
    
db.equipment
    .aggregate
    (
        [
            {$sample: {size: 1}},
            {$project: {_id:0,name:"$name",desc:"$description",price:"$price"}}
        ]
    )
    
db.room
    .aggregate
    (
        [
            {$project: {_id:0,building:"$building","room ID":"$room_ID",
                        type:{$cond: { if: { $eq: ["$type",true]}, then: "Labolatoryjna", else:"Aula wykładowa"  }}   }}
        ]
    )