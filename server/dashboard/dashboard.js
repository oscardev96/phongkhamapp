const express = require("express");
const router = express.Router()
const database = require("../connectDatabase");

router.post("/", async (req, res) => {
    let {time} = req.body
    let sql = `SELECT doctor ,  CONCAT(firstname , " " , lastname) as doctor_name , sum(price) as tien_kham_thang ,count(*) as cuoc_kham_thang  from appointment left join bac_si ON appointment.doctor = bac_si.id where date > ${time}  group by doctor`
    let sql_total_doctor = `SELECT doctor ,  CONCAT(firstname , " " , lastname) as doctor_name , sum(price) as tien_kham_tong ,count(*) as cuoc_kham_tong  from appointment left join bac_si ON appointment.doctor = bac_si.id group by doctor`
    let sql_total  = "select sum(price) as total_money , count(*) as total_appointment from appointment"
    try{
        const [rows, _] = await database.query(sql)
        const [rows2 ,__] = await database.query(sql_total_doctor)
        const [rows3 ,___] = await database.query(sql_total)
        console.log("sss", rows, rows2)
        res.json({
            status : "OK",
            result : {
                moth: rows,
                total_doctor: rows2,
                total : rows3[0]
            }
        })
    } catch (error) {
        res.json({
            status : "KO"
        })






    }
})


module.exports = router