import React,{useState,useEffect} from 'react'
import {Card, Container} from 'react-bootstrap'
import { workplaceService,equipmentService } from '../../services'

export default (prop) => {
    const it = prop.sender.accessories
    const [wp,swp] = useState([])
    const [eq,seq] = useState([])
    const items = []
    useEffect(()=>{
        workplaceService.readAny()
        .then(
            resp => swp(resp),
            err => console.log(err)
        )
        equipmentService.readAny()
        .then(
            resp => seq(resp),
            err => console.log(err)
        )
    },[])
    it.forEach(element => {
        if(element.type == "workspace")
        {
            wp.forEach(x=>{if(element._id === x.id) 
                items.push({amount:element.amount,name:x.type + " station"})})
        }
        if(element.type == "equipment")
        {
            eq.forEach(x=>{if(element._id === x.id) 
                items.push({amount:element.amount,name:x.name})})
        }
    });
    return (
        <Container>
            <br/>
            <Card>
                <h1>{"Room: " + prop.sender.room_ID}</h1>
                <p>{prop.sender.building}</p>
                <hr/>
                <h3>{prop.sender.type === false ? "Lecture hall accessories" : "Labolatory accessories"}</h3>
                <table className='table'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(x=>{
                            return(
                                <tr>
                                <td>{x.name}</td>
                                <td>{x.amount}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Card>
        </Container>
    )
}
