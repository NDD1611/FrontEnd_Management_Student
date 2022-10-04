import axios from "../axios.js"


let getAllClass = async (macb) => {
    let data = await axios.post("/cvht/getclass", { macb })
    return data
}

export default {
    getAllClass,
}