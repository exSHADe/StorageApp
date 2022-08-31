import React, { useEffect, useState } from "react";
import {workplaceService} from '../../services'
import WorkspaceCard from './workspaceCard'

export default Workspaces =>
{
    const [workspaces,setWorkspaces] = useState([])
    useEffect(()=>{
        workplaceService.readAny()
        .then(
            resp => setWorkspaces(resp),
            err => console.log(err)
        )
    },[])
    return (
        workspaces.map(x=><WorkspaceCard key={x.id} props={x}/>)
    )
}