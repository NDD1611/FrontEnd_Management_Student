
import axios from "../axios.js"

let createOneSv = async (sv) => {
    try {
        let res = await axios.post('/cvht/createOnesv', sv)
        return res
    } catch (err) {
        console.log("Error, Service", err)
    }
}

let getAllStudent = async () => {
    let res = await axios.get("/cvht/getallstudent")
    return res
}
export default {
    createOneSv,
    getAllStudent
}
