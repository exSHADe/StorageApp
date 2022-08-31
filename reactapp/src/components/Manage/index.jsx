import React from "react";
import EquipmentForm from "./equipmentForm";
import WorkspaceForm from './workspaceForm';
import RoomForm from "./roomForm";

export default (props) =>
{
    const type = props.location.t
    const mode = props.location.mode
    const sender = props.location?.sender
    if (type=="r") return ( <RoomForm mode={mode} sender={sender}/>)
    if (type=="e") return ( <EquipmentForm mode={mode} sender={sender}/>)
    if (type=="w") return ( <WorkspaceForm mode={mode} sender={sender}/>)
}