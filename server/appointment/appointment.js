const express = require("express");
const { common_post } = require("../../src/utils");
const router = express.Router()
const database = require("../connectDatabase");

// get danh sach cuoc hen
router.post("/" ,  async(req, res, next) => {
    const limit = 15
    let {page} = req.body
    let offset = (page - 1) * limit
    let sqlCount = "SELECT COUNT(*) as total FROM appointment"
    let sql = `SELECT  appointment.id, name,  phone, address, price, total_price, doctor as doctor_id, chan_doan,date, CONCAT(firstname , " " , lastname) as doctor_name FROM appointment LEFT JOIN bac_si ON appointment.doctor = bac_si.id ORDER BY appointment.id DESC  LIMIT ${limit} OFFSET ${offset}`
    try {
        const [count, _] = await database.query(sqlCount)
        const [rows, fields] = await database.query(sql)
        let total = count[0].total
        let countPage = Math.ceil(total/limit)
        let currentPage = page
        res.status(200).json({
            status :"OK",
            total : total,
            countPage : countPage,
            currentPage : currentPage,
            result : rows
        })
    } catch (error) {
        res.status(201).json({
            status : "KO",
            result:error
        })
    }
})
/// them danh sach cuoc hen
router.post("/create" , async(req, res) => {
    let date_now  = Date.now()
    console.log(req.body, date_now)
    let {name , phone, address, price , total_price , chan_doan, doctor , thuoc } = req.body
    let doctor_id = doctor.id
    let str_drug = ""
    let updateDrug =  ""
    let sqlAppointment = `INSERT INTO appointment (id , name, phone, address, price, total_price , chan_doan, doctor, date) VALUES ('${date_now}', '${name}', '${phone}', '${address}', '${price}', '${total_price}' , '${chan_doan}' , '${doctor_id}' , '${date_now}');`
    for (let i = 0; i < thuoc.length; i++) {
        const item = thuoc[i];
        let isEnd  = i == thuoc.length - 1 ? "" : ","
        str_drug = str_drug + `('${date_now}', '${item.id}' , '${item.total}') ` + isEnd
        updateDrug = updateDrug +  `UPDATE drug SET so_luong = ${item.so_luong - item.total } WHERE id = ${item.id} ;`
    }
    let sqlDrug = `INSERT INTO appointment_drug (appointment_id, drug_id, so_luong) VALUES ${str_drug}`

    try {
        const [rows, fields] = await database.query(sqlAppointment)
        const [rows_2, _] = await  database.query(sqlDrug)
        const [rows_3, __] = await  database.query(updateDrug)
        res.status(200).json({
            status : "OK",
            message:"success"
        })
    } catch (error) {
        res.status(201).json({
            status : "KO"
        })}
})

router.post("/detailAppointment" , async (req,res) =>{
    let {id } = req.body
    let sql = `SELECT
    appointment.id, name, phone, address, price, total_price,chan_doan, 
    doctor as doctor_id,
    CONCAT(firstname , " " , lastname) as doctor_name,
    appointment_drug.so_luong as so_luong_thuoc, 
    appointment_drug.drug_id as thuoc_id ,
    drug.gia_ban as gia_ban,
    drug.ten_thuoc as ten_thuoc,
    drug.don_vi as don_vi,
    drug.so_luong as so_luong
    FROM appointment
    JOIN appointment_drug
      ON appointment.id = appointment_drug.appointment_id
    JOIN drug
      ON appointment_drug.drug_id = drug.id
    JOIN bac_si
      ON appointment.doctor = bac_si.id
    Where appointment.id = ${id}`
    try {
        const [rows, _] = await database.query(sql)
        let thuoc = []
        let itemFirst = rows[0]
        console.log(rows)
        for (let i = 0; i < rows.length; i++) {
            const item = rows[i];
            let itemThuoc = {
                thuoc_id : item.thuoc_id,
                total : item.so_luong_thuoc,
                gia_ban : item.gia_ban,
                ten_thuoc: item.ten_thuoc,
                don_vi : item.don_vi

            }
             thuoc.push(itemThuoc)
        }
        let result = {
           ...itemFirst,
           thuoc
        }
        res.status(200).json({
            status :"OK",
            result : result
        })
    } catch (error) {
        
    }
} )

module.exports = router