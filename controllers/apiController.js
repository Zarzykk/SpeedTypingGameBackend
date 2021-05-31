const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"12345",
    host:"localhost",
    port:5432,
    database: "typeracer"
})

const getTexts = async (req, res) => {
    const response = await pool.query('SELECT * FROM text');
    res.status(200).json(response.rows)
}

const getTextById = async (req,res) =>{
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM text WHERE id=$1',[id]);
    res.status(200).json(response.rows)
}

const addText = async (req,res) =>{
    const description = req.body.description;
    const response = await pool.query('INSERT INTO text (description) values ($1)',[description]);
    res.status(200).json(response);
}

const updateText = async (req,res) =>{
    const id = req.params.id;
    const description = req.body.description;
    pool.query('UPDATE text SET description = $1 WHERE id = $2',[description,id])
    res.send("Text "+id +" updated successfully")
}

module.exports={
    getTexts,
    addText,
    getTextById,
    updateText
}