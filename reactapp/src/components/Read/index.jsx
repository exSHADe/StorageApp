import React from "react";
import Room from './room'
import Wp from "./wp";
import Eq from './eq'

export default (props) =>
{
    const type = props.location.t
    const sender = props.location.sender
    if(type === "r") return (<Room sender={sender} style={{width:"100%",height:"100%"}}/>)
    if(type === "w") return (<Wp sender={sender} style={{width:"100%",height:"100%"}}/>)
    if(type === "e") return (<Eq sender={sender} style={{width:"100%",height:"100%"}}/>)
}