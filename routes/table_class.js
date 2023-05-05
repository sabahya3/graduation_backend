const router = require('express').Router()

const tableCellCtrl = require('../controllers/table_class')

router.post('/addNewCellInTable', tableCellCtrl.addNewCellInTable)
router.get('/getCellInTheTableById/:id', tableCellCtrl.getCellInTheTableById)
router.get('/getCellsInTableByClassId/:id', tableCellCtrl.getCellsInTableByClassId)
router.delete('/deleteCellById/:id', tableCellCtrl.deleteCellById)
router.patch('/updateCellInTableById/:id', tableCellCtrl.updateCellInTableById)


// New routes
router.post('/createWeekTable', tableCellCtrl.createWeekTable)
router.get('/getAllWeekTables', tableCellCtrl.getAllWeekTables)
router.get('/getWeekTableById/:id', tableCellCtrl.getWeekTableById)
router.delete('/deleteWeekTableById/:id', tableCellCtrl.deleteWeekTableById)
router.patch('/updateWeekTableById/:id', tableCellCtrl.updateWeekTableById)

module.exports = router


/*module.exports={
    addNewCellInTable,
    updateCellInTableById,
    getCellInTheTableById,
    getCellsInTableByClassId,
    deleteCellById
} */