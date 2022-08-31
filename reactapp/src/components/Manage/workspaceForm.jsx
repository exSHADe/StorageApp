import React,{ useState,useEffect } from "react"
import { Card, Container,Modal } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import {workplaceService,equipmentService} from '../../services'

export default (props) =>
{
    const [item,setItem] = useState({
        type:"",
        components:[]
    })
    const [eq,setEq] = useState([])
    const [mode,setMode] = useState(props.mode)
    const [show, setShow] = useState()
    const history = useHistory();
    useEffect(()=>{
        equipmentService.readAny()
        .then(
            resp => setEq(resp),
            err => console.log(err)
        )
    },[])
    useEffect( ()=> {
        if(mode === true) setItem(props.sender)
    },[])
    function handleData(e) {
        const { id,value} = e.target;
        setItem(item => ({ ...item, [id]: value }));
    }
    function add(e)
    {
        e.preventDefault()
        if(item.components.length < 2) alert("Add more components to a workspace")
        else if(item.type.length != 0 && item.components.length != 0 )
        {workplaceService.create(item)
        .then(
            resp => alert(resp),
            err => console.log(err)
        )
        history.push('/workspaces')
        window.location.reload(true)
        }
        else alert("Fill the form before continue.")
    }
    function edit(e)
    {
        e.preventDefault()
        if(item.components.length >= 2)
        {workplaceService.update(item)
            .then(
                resp => alert(resp),
                err => console.log(err)
            )
        history.push('/workspaces')
        window.location.reload(true)
        }
        else alert("You need to at least 2 components in yout workspace")
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const pushComponent = (id) =>
    { 
        let temp = item.components;
        let find = temp.filter(x=>x._id != id)
        if(temp.length == find.length) {
            temp.push({_id:id})
            setItem({...item,components: temp});
        }
        handleClose();
    }
    const popComponent = (id) => 
    {
        let temp = item.components;
        temp = temp.filter(x=>x._id != id);
        setItem({...item,components: temp});
    }
    return(
        <>
        <Container>
            <br/>
            <Card>
                <form onSubmit={mode ? edit : add}>
                    <h3>{mode ? "Modify item": "Add a new item"}</h3>
                    <hr/>

                    <div className="row" style={{marginTop:"0.2rem",marginBottom:"0.2rem"}}>
                        <div className="col">
                            <label style={{paddingLeft:"3rem"}}>Type</label>
                        </div>
                        <div className="col">
                            <input type="text" style={{width:"95%"}} placeholder="type"
                            id="type" className="form-control" value={item.type}
                            onChange={handleData}/>
                        </div>
                    </div>
                    <button className="btn btn-lg btn-info col" style={{margin:"0.5rem", width:"98%"}}>
                        SEND
                    </button>
                </form>
                <hr/>
                <div className="col">
                    <div className="row">
                        <h3 style={{float:"left",width:"60%", paddingLeft:"10%"}}>Components</h3>
                        <button className="btn btn-warning col-2" style={{float:"left"}} onClick={handleShow}>ADD</button>
                    </div>
                    <br/>
                    <div id="components" className="row">
                        {item.components.length > 0 && item.components.map(x=>{
                            var name = eq.map(z => {
                                if(x._id == z.id)
                                return z.name
                            })
                            return <div className="alert alert-dark col-2 row-2">{name}
                            <br/>
                            <p style={{fontWeight:"600"}} onClick={()=>{popComponent(x._id)}}>REMOVE</p>
                            </div>
                        })}
                    </div>
                </div>
                <br/>
            </Card>
        </Container>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Equipments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
            {eq.map(x=>{
                return <div className="alert alert-info col-6" 
                onClick={()=>{pushComponent(x.id)}}>{x.name}</div>
            })}
            </div>
        </Modal.Body>
        </Modal>                

        </>
    )
}