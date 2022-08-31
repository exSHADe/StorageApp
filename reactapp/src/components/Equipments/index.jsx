import React,{useState,useEffect} from "react";
import {equipmentService} from '../../services'
import EquipmentCard from './equipmentCard'

export default Equipments =>
{
    const [equipments,setEquipments] = useState([])
    useEffect(()=>{
        equipmentService.readAny()
        .then(
            resp => setEquipments(resp),
            err => console.log(err)
        )
    },[])
    const unq = Array.from(new Set(equipments.map(x=>x.category)))
    .map(category=>{
        return {
            id: equipments.find(x=>x.category === category).id ,
            category: category
        }
    })
    return (
        //equipments.map(x=><EquipmentCard key={x.id} props={x}/>)

        unq.map(x=> 
        <div key={x.category} className="col-3" style={{float:"left"}}>
        <hr/>
            <pre style={{fontSize:18, fontStyle:"bold"}}>{x.category} </pre>
        <hr/>
        {equipments.map(z => {
            if(z.category === x.category)
            {
                return <EquipmentCard  key={z.id} props={z}/>
            }
        })}</div>)
    )
}