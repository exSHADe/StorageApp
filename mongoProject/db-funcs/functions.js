function calc(type){
    const eq = db.equipment.find({});
    const wp = db.workplace.findOne({type:type}).components
    var finalPrice = 0
    var usedItems = []
    wp.forEach((c)=>{
        eq.forEach((e)=>{
            if(c._id == e._id) 
            {
                finalPrice = finalPrice + e.price
                usedItems.push(e.name)
            }
        })
    })
    return "Final price for workstation is :" + finalPrice + "\n Used Items: " + usedItems ;
}

calc('processing')

function estimateBudget (minp,maxp,rid){
    const eq = db.equipment.find({});
    const wp = db.workplace.find({});
    const r = db.room.findOne({room_ID:rid});
    wp.components.forEach((c)=>{
        let price = 0;
        eq.forEach((e)=>{
            if(c._id == e.id) price = price + e.price
        })
        wp.finalprice = price
    })
    var budget = 0;
    r.accessories.forEach((a)=>{
        if(a.type == "workspace") 
        {
            wp.forEach((w)=>{
                if(a._id == w._id) budget += (w.finalprice*a.ammount)
            })
        }
        if(a.type == "equipment")
        {
            eq.forEach((e)=>{
                if(a._id == e._id) budget += (e.price*a.ammount)
            })
        }
    })
    if( minp < budget  < maxp ) return "Budget for a room is within a certain price framework"
    else return "Budget for a room isn't within a certain price framework"
    
}

estimateBudget(41000,166000,'1D')