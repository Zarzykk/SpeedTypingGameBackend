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

const addUser = async (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    const response = await pool.query('INSERT INTO account (email,password) values ($1,$2)',[email,password]);
    res.status(200).json(response);
}

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM account');
    res.status(200).json(response.rows)
}

const getUserById = async (req,res) =>{
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM account WHERE id=$1',[id]);
    res.status(200).json(response.rows)
}

const updateUser = async (req,res) =>{
    const id = req.params.id;
    const email = req.body.email;
    const password = req.body.password;
    pool.query('UPDATE account SET email = $1,password = $2 WHERE id = $3',[email,password,id])
    res.send("User "+id +" updated successfully")
}

const addResult = async (req,res) =>{
    const time = req.body.time;
    const wpm = req.body.wpm;
    const accuracy = req.body.accuracy;
    const text_id = req.body.text_id;
    const user_id = req.body.user_id;
    const response = await pool.query('INSERT INTO result (time,wpm,accuracy,text_id,user_id) values ($1,$2,$3,$4,$5)',[time,wpm,accuracy,text_id,user_id]);
    res.status(200).json(response);
}

const getUserResultById = async (req,res) =>{
    const userId = req.params.userId;
    const resultId = req.params.resultId;
    const response = await pool.query('SELECT * FROM result WHERE id=$1 and user_id=$2',[resultId,userId]);
    res.status(200).json(response.rows)
}

const getUserResults = async (req,res) =>{
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM result WHERE user_id=$1',[id]);
    res.status(200).json(response.rows)
}

const updateResult = async (req,res) =>{
    const id = req.params.id;
    const time = req.body.time;
    const wpm = req.body.wpm;
    const accuracy = req.body.accuracy;

    pool.query('UPDATE result SET time = $1,wpm = $2,accuracy = $3 WHERE id = $4',[time,wpm,accuracy,id])
    res.send("Result "+id +" updated successfully")
}


module.exports={
    getTexts,
    addText,
    getTextById,
    updateText,

    addUser,
    getUsers,
    getUserById,
    updateUser,

    addResult,
    getUserResults,
    getUserResultById,
    updateResult
}