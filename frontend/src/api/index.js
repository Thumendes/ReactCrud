import axios from 'axios'

const url = 'http://localhost:3001'

export const fetchData = async (type) => {
    try {
        const response = await axios.get(`${url}/${type}`)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const deleteItem = async (type, id) => {
    try {
        await axios.delete(`${url}/${type}/${id}`)
    } catch (error) {
        console.log(error)
    }
}

export const addItem = (type, value) => {
    try {
        axios.post(`${url}/${type}`, value)
    } catch (error) {
        console.log(error)
    }
}