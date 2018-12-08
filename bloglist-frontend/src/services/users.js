import axios from 'axios'
const baseUrl = '/api/users'

let token = null


const getAll = () => {
    console.log("Users - GetService")
    const request = axios.get(baseUrl)
    console.log('All/users! ')
    return request.then(response => response.data)
}

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const create = async (newObject) => {
    console.log("CreateService", newObject)

    const config = {
        headers: { 'Authorization': token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (id, newObject) => {
    console.log("UpdateService", id)
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

const deletex = async (id) => {
    console.log("DelService", id)
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}


export default { getAll, create, update, deletex, setToken }

