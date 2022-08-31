import React, { useEffect, useState } from "react";
import {roomService} from '../../services'
import RoomCard from './roomCard'

export default Rooms =>
{
    const [rooms,setRooms] = useState([])
    useEffect(()=>{
        roomService.readAny()
        .then(
            resp => setRooms(resp),
            err => console.log(err)
        )
    },[])
    const uq = Array.from(new Set(rooms.map(x=>x.building_shortcut)))
    .map(building_shortcut=>{
        return {
            shortcut: building_shortcut,
            building: rooms.find(x=>x.building_shortcut === building_shortcut).building
        }
    })
    
    return (
        uq.map(x=> <div key={x.shortcut} className="col-4" style={{float:"left"}}>
            <h4>{x.building} </h4>
        <hr/>
        {rooms.map(z => {
            if(z.building_shortcut === x.shortcut)
            {
                return <RoomCard  key={z.id} props={z}/>
            }
        })}</div>
        )
        //todo : map service and click for card for details, remove button, edit button
    )
}