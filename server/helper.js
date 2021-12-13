const database = require("./connectDatabase");


const query = async (str_qr) => {
   try {
    const [rows, fields]= await database.query(str_qr)
    console.log("DATABASE QUERY", rows)
    return rows
   } catch (error) {
       return error
   }

}
module.exports = {
    query
}