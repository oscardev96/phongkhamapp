const express = require("express");
const router = express.Router()
const database = require("../connectDatabase");

router.post("/", async (req, res, next) => {
    let slq = "SELECT * FROM bac_si"
    try {
        const [rows, fields] = await database.query(slq)
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

module.exports =  router