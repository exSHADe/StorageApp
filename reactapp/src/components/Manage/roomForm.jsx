import React,{ useState,useEffect } from "react"
import { Card, Container,Modal } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import {roomService,workplaceService,equipmentService} from '../../services'

export default (props) =>
{
    const [item,setItem] = useState({
        building:"",
        building_shortcut:"",
        room_ID:"",
        type:false,
        accessories:[]
    })
    const [eq,setEq] = useState([])
    const [wp,setWp] = useState([])
    const [mode,setMode] = useState(props.mode)
    const [show, setShow] = useState()
    const [show2, setShow2] = useState()
    const [amount,setAmount] = useState(1)
    const history = useHistory();
    useEffect(()=>{
        workplaceService.readAny()
        .then(
            resp => setWp(resp),
            err => console.log(err)
        )
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
        if(item.building.length != 0 && item.building_shortcut.length != 0 && 
            item.room_ID.length != 0 &&  item.accessories.length != 0 )
        {roomService.create(item)
        .then(
            resp => alert(resp),
            err => console.log(err)
        )
        history.push('/')
        window.location.reload(true)
        }
        else alert("Fill the form before continue.")
    }
    function edit(e)
    {
        e.preventDefault()
        if(item.accessories.length != 0 )
        {roomService.update(item)
        .then(
            resp => alert(resp),
            err => console.log(err)
        )
        history.push('/')
        window.location.reload(true)
        }
        else alert("You need to add at least 1 accessories")
        
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const pushAccessories = (id,amount,type) =>
    { 
        let temp = item.accessories;
        let find = temp.filter(x=>x._id != id)
        if(temp.length == find.length) {
            temp.push({_id:id,type:type,amount:amount})
            setItem({...item,accessories: temp});
        }
        if(type === "equipment") handleClose();
        if(type === "workspace")  handleClose2();
    }
    const popAccessories = (id) => 
    {
        let temp = item.accessories;
        temp = temp.filter(x=>x._id != id);
        setItem({...item,accessories: temp});
    }
    return(
        <>
        <Container>
            <br/>
            <Card>
                <form onSubmit={mode ? edit : add}>
                    <h3>{mode ? "Modify room": "Add a new room"}</h3>
                    <hr/>

                    <div className="row" style={{marginTop:"0.2rem",marginBottom:"0.2rem"}}>
                        <div className="col">
                            <label style={{paddingLeft:"3rem"}}>Building</label>
                        </div>
                        <div className="col">
                            <input type="text" style={{width:"95%"}} placeholder="building"
                            id="building" className="form-control" value={item.building}
                            onChange={handleData}/>
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"0.2rem",marginBottom:"0.2rem"}}>
                        <div className="col">
                            <label style={{paddingLeft:"3rem"}}>Building shortcut:</label>
                        </div>
                        <div className="col">
                            <input type="text" style={{width:"95%"}} placeholder="building_shortcut"
                            id="building_shortcut" className="form-control" value={item.building_shortcut}
                            onChange={handleData}/>
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"0.2rem",marginBottom:"0.2rem"}}>
                        <div className="col">
                            <label style={{paddingLeft:"3rem"}}>Room ID</label>
                        </div>
                        <div className="col">
                            <input type="text" style={{width:"95%"}} placeholder="room ID"
                            id="room_ID" className="form-control" value={item.room_ID}
                            onChange={handleData}/>
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"0.2rem",marginBottom:"0.2rem"}}>
                        <div className="col">
                            <label style={{paddingLeft:"3rem"}}>Type</label>
                        </div>
                        <div className="col">
                           <select style={{width:"95%"}} id="type" value={item.type}
                           className="custom-select" onChange={handleData}>
                               <option value={true}>Labolatory </option>
                               <option value={false}>Lecture hall</option>
                            </select> 
                        </div>
                    </div>
                    <button className="btn btn-lg btn-info col" style={{margin:"0.5rem", width:"98%"}}>
                        SEND
                    </button>
                </form>
                <hr/>
                <div className="col">
                    <div className="row">
                        <h3 style={{float:"left",width:"60%", paddingLeft:"10%"}}>Accessories</h3>
                        <button className="btn btn-warning col-2" style={{float:"left", marginRight:"0.2rem"}} 
                        onClick={handleShow}>ADD EQUIPMENT</button>
                        <button className="btn btn-warning col-2" style={{float:"left"}} 
                        onClick={handleShow2}>ADD WORKSPACE</button>
                    </div>
                    <br/>
                    <div id="accessories" className="row">
                        {item.accessories.length > 0 && item.accessories.map(x=>{
                            if(x.type == "equipment")
                            var name = eq.map(z => {
                                if(x._id == z.id)
                                return z.name
                            })
                            if(x.type == "workspace")
                            var name = wp.map(z => {
                                if(x._id == z.id)
                                return z.type + " station"
                            })
                            return <div className="alert alert-dark col-2 row-2">{name}
                            <p>{"Amount:" + x.amount}</p>
                            <p style={{fontWeight:"600"}} onClick={()=>{popAccessories(x._id)}}>REMOVE</p>
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
            <div className="row" style={{marginTop:"0.2rem",marginBottom:"0.2rem"}}>
                <div className="col">
                    <label style={{paddingLeft:"3rem"}}>Amount</label>
                </div>
                <div className="col">
                    <input type="number" style={{width:"95%"}} placeholder="amount"
                    id="amount" className="form-control" value={amount}
                    onChange={e=>setAmount(parseInt(e.target.value))}/>
                </div>
            </div>
            <hr/>
            <div className="row">
            {eq.map(x=>{
                return <div className="alert alert-info col-6" style={{float:"left"}}
                onClick={()=>{pushAccessories(x.id,amount,"equipment")}}>{x.name}</div>
            })}
            </div>
        </Modal.Body>
        </Modal>  

        <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Workstations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row" style={{marginTop:"0.2rem",marginBottom:"0.2rem"}}>
                <div className="col">
                    <label style={{paddingLeft:"3rem"}}>Amount</label>
                </div>
                <div className="col">
                    <input type="number" style={{width:"95%"}} placeholder="amount"
                    id="amount" className="form-control" value={amount}
                    onChange={e=>setAmount(parseInt(e.target.value))}/>
                </div>
            </div>
            <hr/>
            <div className="row">
            {wp.map(x=>{
                return <div className="alert alert-info col-6" style={{float:"left"}}
                onClick={()=>{pushAccessories(x.id,amount,"workspace")}}>{x.type + " station"}</div>
            })}
            </div>
        </Modal.Body>
        </Modal> 

        </>
    )}
