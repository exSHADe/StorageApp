import React from 'react'
import {Card, Container} from 'react-bootstrap'
import {equipmentService } from '../../services'

export default (prop) => {
    const it = prop.sender.components
    return (
        <Container>
            <br/>
            <Card>
                <h5 style={{fontStyle:"italic",color:"#C6CACC"}}>{prop.sender.category}</h5>
                <h1>{prop.sender.name}</h1>
                <h4>{"Price: " + prop.sender.price + "$"}</h4>
                <hr/>
                <h3>{prop.sender.description}</h3>
            </Card>
        </Container>
    )
}
