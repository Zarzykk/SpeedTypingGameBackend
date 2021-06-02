const {Router} = require('express');
const router = Router();

const { getTexts,addText,getTextById,updateText,addUser,updateUser,getUserById,getUsers,addResult,getUserResults,getUserResultById,updateResult } = require('../controllers/apiController')

router.get('/texts', getTexts);
router.get('/texts/:id',getTextById);
router.post('/texts',addText);
router.put('/texts/:id',updateText);

router.get('/users', getUsers);
router.get('/users/:id',getUserById);
router.post('/users',addUser);
router.put('/users/:id',updateUser);

router.post('/users/:id/results',addResult)
router.get('/users/:id/results',getUserResults)
router.get('/users/:userId/results/:resultId',getUserResultById);
router.put('/users/:id/results',updateResult)

module.exports = router;