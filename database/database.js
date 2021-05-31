const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"12345",
    host:"localhost",
    port:5432,
    database: "typeracer"
})


const addText = async (req,res) =>{
    try  {
        const {description} = req.body.description;
        const newText = await pool.query("INSERT INTO text (description) values ($1)", [description])
        res.json(newText)
    }
    catch
        (err)
    {
        console.log(err.message);
    }
}

module.exports = {
    pool,
    addText
};