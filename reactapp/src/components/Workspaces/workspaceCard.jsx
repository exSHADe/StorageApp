import React,{ useState,useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { roomService,workplaceService } from '../../services';

export default (props) => {
    const [rooms,setRooms] = useState([])
    useEffect(()=>{
        roomService.readAny()
        .then(
            resp => setRooms(resp),
            err => console.log(err)
        )
    },[])
    const handleDelete = (id) =>{
        rooms.map(room=>{
            let temp = room.accessories.filter(x=>{return (x._id != id && x.type == "workspace") || x.type=="equipment"})
            if(room.accessories.length != temp.length)
            {
                room.accessories = temp
                roomService.update(room)
            }
        })
        workplaceService.delete(props.props.id)
    }
    return (
        <Card className='col-2 row-2' style={{float:"left"}}>
            <Card.Header> {props.props.type + " station"} </Card.Header>
            <Card.Body>
                <Card.Title>{"Amount of components:" + props.props.components.length}</Card.Title> 
            </Card.Body>
            <Card.Footer className='row'>
                <Link className='col btn btn-primary' 
                to={{pathname:"/display" , t:"w" , sender:props.props}}>DISPLAY</Link>
                <Link className='col btn btn-secondary' 
                to={{pathname:"/manage" , t:"w" , sender:props.props, mode:true}}>MODIFY</Link>
                <a href='/workspaces' className='col btn btn-danger' 
                onClick={()=>{handleDelete(props.props.id)}}>DELETE</a>
            </Card.Footer>
        </Card>
    )

}