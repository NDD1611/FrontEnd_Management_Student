
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

let getFullInfoSv = async (masv) => {
    try {
        let res = await axios.post("/getfullinfosv", { masv: masv })
        return res
    } catch (err) {
        console.log(err)
    }
}

let themHocPhan = async (data) => {
    let res = axios.post('/sv/themhp', data)
    return res
}

let getDiemHP = async (data) => {
    let res = axios.post('/getdiemhpt', data)
    return res
}

let deleteHP = (hp) => {
    let res = axios.post('/deletediemhpt', hp)
    return res
}
let getFullHP = (masv) => {
    let res = axios.post('/getfullhp', { masv })
    return res
}

let getAllClass = async (macb) => {
    let data = await axios.post("/cvht/getclass", { macb })
    return data
}

let editLop = async (data) => {
    let res = await axios.post("/cvht/editlop", data)
    return res
}
let delClass = async (malop) => {
    let res = await axios.post("/cvht/dellop", { malop })
    return res
}
let createAnnounce = async (data) => {
    let res = await axios.post("/createannouce", data)
    return res
}
let getAllAnnounce = async (malop) => {
    let data = await axios.post("/getallannounce", { malop })
    return data
}
let getInfoCVHTFromMaLop = async (malop) => {
    let res = await axios.post("/getinfocvhtfrommalop", { malop })
    return res
}
let addDRL = async (data) => {
    let res = await axios.post("/adddiemrenluyen", data)
    return res
}
let getDiemRL = (data) => {
    let res = axios.post('/getdiemrenluyen', data)
    return res
}
let addHD = (data) => {
    let res = axios.post('/addHD', data)
    return res
}
let getHD = (masv) => {
    let res = axios.post('/getHD', { masv })
    return res
}
let editHD = (data) => {
    let res = axios.post('/editHD', data)
    return res
}
let delHD = (data) => {
    let res = axios.post('/delHD', data)
    return res
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
    getFullInfoSv,
    themHocPhan,
    getDiemHP,
    deleteHP,
    getFullHP,
    getAllClass,
    editLop,
    delClass,
    createAnnounce,
    getAllAnnounce,
    getInfoCVHTFromMaLop,
    addDRL,
    getDiemRL,
    addHD,
    getHD,
    editHD,
    delHD,

}
