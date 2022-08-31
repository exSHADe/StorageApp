import React,{useState,useEffect} from 'react'
import {Card, Container} from 'react-bootstrap'
import {equipmentService } from '../../services'

export default (prop) => {
    const it = prop.sender.components
    const [eq,seq] = useState([])
    const items = []
    var price = 0;
    useEffect(()=>{
        equipmentService.readAny()
        .then(
            resp => seq(resp),
            err => console.log(err)
        )
    },[])
    it.forEach(element => {
        eq.forEach(x=>{if(element._id === x.id) {
            items.push({cat:x.category,name:x.name})
            price = price+x.price
        }
    })});
    return (
        <Container>
            <br/>
            <Card>
                <h1>{prop.sender.type + " station"}</h1>
                <hr/>
                <h3>{"Final price: " + price + "$"}</h3>
                <table className='table'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Category</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(x=>{
                            return(
                                <tr>
                                <td>{x.cat}</td>
                                <td>{x.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Card>
        </Container>
    )
}
