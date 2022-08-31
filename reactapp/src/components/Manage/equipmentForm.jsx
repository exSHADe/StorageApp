import React,{ useState,useEffect } from "react"
import { Card, Container } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import {equipmentService} from '../../services'

export default (props) =>
{
    const [item,setItem] = useState({
        category:"education",
        name:"",
        description:"",
        price:0
    })
    const [mode,setMode] = useState(props.mode)
    const history = useHistory();
    useEffect( ()=> {
        if(mode === true) setItem(props.sender)
    },[])
    function handleData(e) {
        const { id,value} = e.target;
        if (id === "price") setItem({...item,[id]:parseFloat(value)})
        else setItem(item => ({ ...item, [id]: value }));
    }
    function add(e)
    {
        e.preventDefault()
         if(item.category.length != 0 && item.name.length != 0 && 
             item.description.length != 0 && item.price >=1)
        if(item)
        {equipmentService.create(item)
        .then(
            resp => alert(resp),
            err => console.log(err)
        )
        history.push('/equipments')
        window.location.reload(true)
        }
        else alert("Fill the form before continue.")
    }
    function edit(e)
    {
        e.preventDefault()
        equipmentService.update(item)
        .then(
            resp => alert(resp),
            err => console.log(err)
        )
        history.push('/equipments')
        window.location.reload(true)
    }
    return(
        <Container>
            <br/>
            <Card>
                <form onSubmit={mode ? edit : add}>
                    <h3>{mode ? "Modify item": "Add a new item"}</h3>
                    <hr/>

                    <div className="row" style={{marginTop:"0.2rem",marginBottom:"0.2rem"}}>
                        <div className="col">
                            <label style={{paddingLeft:"3rem"}}>Category</label>
                        </div>
                        <div className="col">
                           <select style={{width:"95%"}} id="category" value={item.category}
                           className="custom-select" onChange={handleData}>
                               <option value="education">Education </option>
                               <option value="hardware">Hardware</option>
                               <option value="Peripheral device">Peripheral device </option>
                               <option value="security">Security</option>
                            </select> 
                        </div>
                    </div>

                    <div className="row" style={{marginTop:"0.2rem",marginBottom:"0.2rem"}}>
                        <div className="col">
                            <label style={{paddingLeft:"3rem"}}>Name</label>
                        </div>
                        <div className="col">
                            <input type="text" style={{width:"95%"}} placeholder="name"
                            id="name" className="form-control" value={item.name}
                            onChange={handleData}/>
                        </div>
                    </div>

                    <div className="row" style={{marginTop:"0.2rem",marginBottom:"0.2rem"}}>
                        <div className="col">
                            <label style={{paddingLeft:"3rem"}}>Description</label>
                        </div>
                        <div className="col">
                            <textarea type="text" style={{width:"95%"}}  placeholder="description"
                            id="description" className="form-control" value={item.description} 
                            onChange={handleData}/>
                        </div>
                    </div>

                    <div className="row" style={{marginTop:"0.2rem",marginBottom:"0.2rem"}}>
                        <div className="col">
                            <label style={{paddingLeft:"3rem"}}>Price</label>
                        </div>
                        <div className="col">
                            <input type="number" style={{width:"95%"}} id="price" 
                             className="form-control" value={item.price} onChange={handleData}/>
                        </div>
                    </div>

                    <button className="btn btn-lg btn-info col" style={{margin:"0.5rem", width:"98%"}}>
                        SEND
                    </button>
                </form>
            </Card>
        </Container>
    )
}