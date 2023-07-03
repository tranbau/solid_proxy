var express = require('express');
var router = express.Router();
const {getDrugs, createDrug, updateDrug, deleteDrug, getDrugById} = require('../../controllers/drug.controller')

router.get('/', getDrugs).post('/', createDrug).delete('/',deleteDrug);
router.get('/:id', getDrugById).put('/:id', updateDrug);


module.exports = router;