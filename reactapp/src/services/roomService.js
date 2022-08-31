import axios from "axios";

const url = "http://localhost:3001/api/rooms"

const create = async (room) => {
    await axios.post(`${url}/create`,room)
    .catch(err => {
        if(err.response)
        {
           if(err.response.status !== 200 || err.response.status !== 201)return Promise.reject(err.response.statusText)
        } 
        else if(err.request) return Promise.reject("Server busy")
        else return Promise.reject("Try again!");
    })
    return "Operation create completed."
}
const read = async (id) => {
    const sender =await axios.get(`${url}/${id}`)
    .catch(err => {
        if(err.response)
        {
           if(err.response.status !== 200 || err.response.status !== 201) return Promise.reject(err.response.statusText)
        } 
        else if(err.request) return Promise.reject("Server busy")
        else return Promise.reject("Try again!");
    })
    return sender.data
}
const readAny = async () => {
    const sender =  await axios.get(`${url}/`)
    .catch(err => {
        if(err.response)
        {
           if(err.response.status !== 200 || err.response.status !== 201)return Promise.reject(err.response.statusText)
        } 
        else if(err.request) return Promise.reject("Server busy")
        else return Promise.reject("Try again!");
    })
    return sender.data
}
const update = async (room) => {
    const sender = await axios.put(`${url}/${room.id}`,room)
    .catch(err => {
        if(err.response)
        {
           if(err.response.status !== 200 || err.response.status !== 201)return Promise.reject(err.response.statusText)
        } 
        else if(err.request) return Promise.reject("Server busy")
        else return Promise.reject("Try again!");
    })
    return sender.data
}
const _delete = async (id) => {
    await axios.delete(`${url}/${id}`)
    .catch(err => {
        if(err.response)
        {
           if(err.response.status !== 200 || err.response.status !== 201)return Promise.reject(err.response.statusText)
        } 
        else if(err.request) return Promise.reject("Server busy")
        else return Promise.reject("Try again!");
    })
    return "Operation delete completed."
}

export const roomService = {
    create,
    read,
    readAny,
    update,
    delete:_delete
}