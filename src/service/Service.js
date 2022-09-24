
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

let editSv = async (sv) => {
    try {
        let res = await axios.post('/cvht/editsv', sv)
        return res
    } catch { err } {
        console.log("Error Srevice Front", err)

    }
}

let deleteSv = async (id) => {
    try {
        let res = await axios.post("/cvht/deletesv", { id: id })
        return res
    } catch (err) {
        console.log(err)
    }
}

let Login = async (info) => {
    try {
        let res = await axios.post("/login", info)
        return res
    } catch (err) {
        alert("Đăng nhập thất bại")
    }
}

let createAccount = async (data) => {
    try {
        let res = await axios.post("/admin/createaccount", data)
        console.log(res)
        alert(res.mes)
    } catch (err) {
        alert("Đã Có Lỗi Xảy Ra")
    }
}

export default {
    createOneSv,
    getAllStudent,
    editSv,
    deleteSv,
    Login,
    createAccount
}
