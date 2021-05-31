const {Router} = require('express');
const router = Router();

const { getTexts,addText,getTextById,updateText } = require('../controllers/apiController')

router.get('/texts', getTexts);
router.get('/texts/:id',getTextById);
router.post('/texts',addText);
router.put('/texts/:id',updateText);

module.exports = router;