const express = require("express");
const router = express.Router()
const database = require("../connectDatabase");

router.post("/", async (req, res, next) => {
    let str_qr = "SELECT * FROM drug"
    try {
        const [rows, fields] = await database.query(str_qr)
        res.status(200).json({
            status :"OK",
            result : rows
        })
    } catch (error) {
        res.status(201).json({
            status : "KO",
            result:error
        })
    }
})

router.post("/delete" , async (req, res) => {
    let str_qr = `DELETE FROM drug WHERE id = ${req.body.id} `
    try {
        const [rows, fields] = await database.query(str_qr)
        res.status(200).json({
            status :"OK",
            message : "success"
        })
    } catch (error) {
        res.status(201).json({
            status : "KO",
            result:error
        })
    }
})


router.post("/addDrug" , async (req, res) => {
    let {ten_thuoc, don_vi, gia_ban, so_luong } = req.body
    
    let str_qr = `INSERT INTO drug (ten_thuoc, don_vi, gia_ban, so_luong) VALUES ("${ten_thuoc}", "${don_vi}", "${gia_ban}", "${so_luong}") `
    try {
        const [rows, fields] = await database.query(str_qr)
        res.status(200).json({
            status :"OK",
            message : "success"
        })
    } catch (error) {
        res.status(201).json({
            status : "KO",
            result:error
        })
    }
})

router.post("/updateQuantityDrug" , async (req, res) => {
    let {ten_thuoc, don_vi, gia_ban, so_luong , id } = req.body
    
    let str_qr = `UPDATE drug SET ${ so_luong ? `so_luong = ${so_luong} ` : ""}  ${ gia_ban ? `,gia_ban = ${gia_ban}` : ""}   ${ ten_thuoc ? `,ten_thuoc = ${ten_thuoc}` : ""} 
    ${ don_vi ? `,don_vi = ${don_vi}` : ""} WHERE id = ${id} `
    try {
        const [rows, fields] = await database.query(str_qr)
        res.status(200).json({
            status :"OK",
            message : "success"
        })
    } catch (error) {
        res.status(201).json({
            status : "KO",
            result:error
        })
    }
})



module.exports =  router