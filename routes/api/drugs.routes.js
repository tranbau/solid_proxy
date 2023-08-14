var express = require('express');
var router = express.Router();
const {getDrugs, createDrug, updateDrug, deleteDrug, getDrugById} = require('../../controllers/drug.controller')

router.route('/').get(getDrugs).post(createDrug);
router.route('/:id').get(getDrugById).put(updateDrug).delete(deleteDrug);

module.exports = router;