
import axios from "../axios.js"

let createOneSv = async (sv) => {
    try {
        let res = await axios.post('/student', sv)
        return res
    } catch (err) {
        console.log("Error, Service", err)
    }
}

let getAllStudentLop = async (malop) => {
    let res = await axios.get("/student-all-class/" + malop)
    return res
}

let editSv = async (sv) => {
    try {
        let res = await axios.put('/student', sv)
        return res
    } catch { err } {
        console.log("Error Srevice Front", err)

    }
}

let deleteSv = async (data) => {
    try {
        let res = await axios.delete("/student", {
            data: data
        })
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
        let res = await axios.post("/account", data)
        alert(res.mes)
    } catch (err) {
        alert("Đã Có Lỗi Xảy Ra")
    }
}

let changePass = async (info) => {
    try {
        let res = await axios.put("/password", info)
    } catch (err) {
        alert("Đã Có Lỗi Xảy Ra")
    }
}

// cap nhat thong tin cua co van hoc tap
let updateInfoCVHT = async (info) => {
    try {
        let res = await axios.put('/consultant', info)
        return res
    } catch (err) {
        console.log("Error Srevice Front", err)

    }
}

let addClass = async (info) => {
    try {
        let res = await axios.post("/class", info)
        return res
    } catch (err) {
        console.log(err)
    }
}

let getFullInfoSv = async (masv) => {
    try {
        let res = await axios.get("/student/" + masv)
        return res
    } catch (err) {
        console.log(err)
    }
}

let themHocPhan = async (data) => {
    let res = axios.post('/subject', data)
    return res
}

let getDiemHP = async (data) => {
    let res = axios.post('/score-semester', data)
    return res
}

let deleteHP = (hp) => {
    let res = axios.delete('/subject', {
        data: hp
    })
    return res
}
let getFullHP = (masv) => {
    let res = axios.get('/subject/' + masv)
    return res
}

let getAllClass = async (macb) => {
    let data = await axios.get("/class/" + macb)
    return data
}

let editLop = async (data) => {
    let res = await axios.put("/class", data)
    return res
}
let delClass = async (malop) => {
    let res = await axios.delete("/class", {
        data: { malop }
    })
    return res
}
let createAnnounce = async (data) => {
    let res = await axios.post("/announce", data)
    return res
}
let getAllAnnounce = async (malop) => {
    let data = await axios.get("/announce/" + malop)
    return data
}
let getInfoCVHTFromMaLop = async (malop) => {
    let res = await axios.get("/consultant-from-class/" + malop)
    return res
}
let addDRL = async (data) => {
    let res = await axios.post("/diem-ren-luyen", data)
    return res
}
let getDiemRL = (data) => {
    let res = axios.post('/getdiemrenluyen', data)
    return res
}
let addHD = (data) => {
    let res = axios.post('/activity', data)
    return res
}
let getHD = (masv) => {
    let res = axios.get('/activity/' + masv)
    return res
}
let editHD = (data) => {
    let res = axios.put('/activity', data)
    return res
}
let delHD = (data) => {
    let res = axios.delete('/activity', { data: data })
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
