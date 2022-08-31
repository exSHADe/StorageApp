import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {roomService} from '../../services'

export default (props) => {
    return (
        <Card>
            <Card.Header> {props.props.room_ID} </Card.Header>
            <Card.Body>
                <Card.Title>{props.props.type === false ? "Lecture hall" : "Labolatory" }</Card.Title> 
            </Card.Body>
            <Card.Footer className='row'>
                <Link className='col-6 btn btn-primary' 
                to={{pathname:"/display" , t:"r" , sender:props.props}}>DISPLAY</Link>
                <Link className='col btn btn-secondary'
                to={{pathname:"/manage", t:"r", sender:props.props, mode:true}}>MODIFY</Link>
                <a href='/' className='col btn btn-danger' 
                onClick={()=>{roomService.delete(props.props.id)}}>DELETE</a>
            </Card.Footer>
        </Card>
    )

}