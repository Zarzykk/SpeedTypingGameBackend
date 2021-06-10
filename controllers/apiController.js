const Pool = require("pg").Pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { validateRegisterAndLogin } = require('../validation/validation')
const { secretTokenString } = require('../config')

const pool = new Pool({
    user:"postgres",
    password:"12345",
    host:"localhost",
    port:5432,
    database: "typeracer"
})

const getRandomText = async (req, res) => {
    const response = await pool.query('SELECT * FROM text order by RANDOM() limit 1');
    res.status(200).json(response.rows)
}

const getTextById = async (req,res) =>{
    const id = req.params.id;
    const response = await pool.query('SELECT description FROM text WHERE id=$1',[id]);
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

    const {value,error} = validateRegisterAndLogin(res.body)
    const email = req.body.email;
    const password = req.body.password;

    if(error)
        return res.status(400).send(error.details[0].message)

    const user = await pool.query('SELECT email from account where email = $1',[email])

    const errorMessage = 'Email already exists!'
    if(user.rows.length>0) return res.status(400).send(errorMessage)

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password,salt)

     let newUser;
    try{
        newUser = await pool.query('INSERT INTO account (email,password) values ($1,$2)',[email,hashedPassword]);
    }catch (err){
        return res.status(422).json({message: err.message})
    }

    res.status(200).send({
        message: 'Register success'
    })

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
    const response = await pool.query('SELECT id,time,wpm,accuracy,text_id FROM result WHERE id=$1 and user_id=$2',[resultId,userId]);
    res.status(200).json(response.rows)
}

const getUserResults = async (req,res) =>{
    const id = req.params.id;
    const response = await pool.query('select time,wpm,accuracy,text.description from result r right join text on r.text_id=text.id where user_id=$1',[id]);
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

const login = async (req,res) =>{

    const email = req.body.email;
    const password = req.body.password;
    const { value, error } = validateRegisterAndLogin(req.body)

    if(error)
        return res.status(400).send(error.details[0].message)

    const results = await pool.query('SELECT * from account where email = $1',[email])

    const errorMessage = 'Incorrect email or password!'

    if(results.rows.length<1) return res.status(400).send(errorMessage)

    const user = results.rows[0]

    const isPasswordValid = await bcrypt.compare(password,user.password)
    if (!isPasswordValid) {
        return res.status(401).send(errorMessage)
    }

    const token = jwt.sign(user.id,secretTokenString)
    res.header('auth-token',token).send({token,id:user.id})
}


module.exports={
    getRandomText,
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
    updateResult,

    login
}