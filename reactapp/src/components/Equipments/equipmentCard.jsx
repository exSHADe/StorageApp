import React, {useState,useEffect} from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {roomService,workplaceService,equipmentService} from '../../services'

export default (props) => {
    const [rooms,setRooms] = useState([])
    const [workspace,setWorkspace] = useState([])
    useEffect(()=>{
        roomService.readAny()
        .then(
            resp => setRooms(resp),
            err => console.log(err)
        )
        workplaceService.readAny()
        .then(
            resp => setWorkspace(resp),
            err => console.log(err)
        )
    },[])
    const handleDelete = (id) =>{
        rooms.map(room=>{
            let temp = room.accessories.filter(x=>
                {return (x._id != id && x.type == "equipment") || x.type=="workspace"})
            if(room.accessories.length != temp.length)
            {
                room.accessories = temp
                roomService.update(room)
            }
        })
        workspace.map(workspace => {
            let temp = workspace.components.filter(x=>x._id != id)
            if(workspace.components.length != temp.length)
            {
                workspace.components = temp
                workplaceService.update(workspace)
            }
        })
        equipmentService.delete(props.props.id)
    }
    return (
        <Card>
            <Card.Header> {props.props.name} </Card.Header>
            <Card.Body className='row'>
                <Link className='col btn btn-primary' 
                to={{pathname:"/display" , t:"e" , sender:props.props}}>DISPLAY</Link>
                <Link className='col-4 btn btn-secondary' 
                to={{pathname:"/manage" , t:"e" , sender:props.props, mode:true}}>MODIFY</Link>
                <a href='/equipments' className='col-3 btn btn-danger' 
                onClick={()=>{handleDelete(props.props.id)}}>DELETE</a>
            </Card.Body>
        </Card>
    )

}