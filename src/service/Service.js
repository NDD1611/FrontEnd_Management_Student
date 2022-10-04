
import axios from "../axios.js"

let createOneSv = async (sv) => {
    try {
        let res = await axios.post('/cvht/createOnesv', sv)
        return res
    } catch (err) {
        console.log("Error, Service", err)
    }
}

let getAllStudentLop = async (malop) => {
    // console.log(malop)
    let res = await axios.post("/cvht/getallstudentlop", { malop: malop })
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

let deleteSv = async (data) => {
    try {
        let res = await axios.post("/cvht/deletesv", data)
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
        // console.log(res)
        alert(res.mes)
    } catch (err) {
        alert("Đã Có Lỗi Xảy Ra")
    }
}

let changePass = async (info) => {
    try {
        let res = await axios.post("/changepass", info)
        // console.log(res)
    } catch (err) {
        alert("Đã Có Lỗi Xảy Ra")
    }
}

// cap nhat thong tin cua co van hoc tap
let updateInfoCVHT = async (info) => {
    try {
        let res = await axios.post('/cvht/editcvht', info)
        return res
    } catch (err) {
        console.log("Error Srevice Front", err)

    }
}

let addClass = async (info) => {
    try {
        let res = await axios.post("/cvht/addclass", info)
        return res
    } catch (err) {
        console.log(err)
    }
}

export default {
    createOneSv,
    getAllStudentLop,
    editSv,
    deleteSv,
    Login,
    createAccount,
    changePass,
    updateInfoCVHT,
    addClass,
}
