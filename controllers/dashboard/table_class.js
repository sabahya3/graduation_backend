
const TableCell = require('../../models/table_classes');

// Create a new TableCell record
const addNewCellInTable = async (req, res) => {
    try {
        const { classId, day, subject, teacher ,time } = req.body;
        const newTableCell = await new TableCell({ classId, day, subject, teacher ,time }).save();
        if (newTableCell) {
            const result = await TableCell.findOne({ _id: newTableCell._id }).populate('teacher', 'name').populate('subject', 'name').populate('classId', 'name');
            // console.log(newTableCell)
            return res.status(201).json({
                day: result.day,
                subject: result.subject ? result.subject.name : null,
                teacher: result.teacher ? result.teacher.name : null,
                className: result.classId ? result.classId.name : null,
                time: result.time?result.time:null,
                _id: result._id
            });
        }
        return res.status(404).json({ msg: 'an error occured' });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const getCellsInTableByClassId = async (req, res) => {
    try {
        const id = req.params.id;
        const tableCells = await TableCell.find({ classId: id, $or: [{ subject: { $ne: null } }, { teacher: { $ne: null } }] })
            .populate('subject', 'name')
            .populate('teacher', 'name')
            .populate('classId', 'name')
            .sort({ day: 1 }); // Sort by day ascending

        const simplifiedTableCells = tableCells.map(({ _id, day, subject, teacher, time,classId }) => ({
            day,
            subject: subject ? subject.name : null,
            teacher: teacher ? teacher.name : null,
            time,
            className: classId ? classId.name : null,
            _id
        }));

        res.json(simplifiedTableCells);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

// Get a specific TableCell record
const getCellInTheTableById = async (req, res) => {
    try {
        const tableClass = await TableCell.findById(req.params.id).populate('subject', 'name').populate('teacher', 'name').populate('classId', 'name')
        if (!tableClass) {
            return res.status(404).send('cell not found');
        }
        res.json({
            day: tableClass.day,
            subject: tableClass.subject ? tableClass.subject.name : null,
            teacher: tableClass.teacher ? tableClass.teacher.name : null,
            time:tableClass.time?tableClass.time:null,
            className: tableClass.classId
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

// Update a specific TableCell record
const updateCellInTableById = async (req, res) => {
    const { day, subject, teacher, classId } = req.body
    try {
        const tableClass = await TableCell.findByIdAndUpdate(req.params.id, { $set: { day, subject, teacher, classId } }, { new: true }).populate('subject', 'name').populate('teacher', 'name').populate('classId', 'name');
        if (!tableClass) {
            return res.status(404).send('cell not found');
        }
        res.json({
            day: tableClass.day,
            subject: tableClass.subject ? tableClass.subject.name : null,
            teacher: tableClass.teacher ? tableClass.teacher.name : null,
            className: tableClass.classId
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

// Delete a specific TableCell record
deleteCellById = async (req, res) => {
    try {
        const tableClass = await TableCell.findByIdAndDelete(req.params.id);
        if (!tableClass) {
            return res.status(404).send('cell not found');
        }
        res.json({ message: 'cell deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Delete week table entry by ID
const deleteWeekTableCellsByClassId = async (req, res) => {
    try {
        const result = await TableCell.deleteMany({ classId: req.params.classId })
        if (result) return res.status(200).json({ msg: 'All Cells of the table deleted successfully!' });
        else return res.status(404).send('cells not found');

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


// week table part 
const WeekTable = require('../../models/week_table');

// Create new week table entry
const createWeekTable = async (req, res) => {
    try {
        const { classId, duration, startTime, endTime, firstDay, lastDay, lessonNum } = req.body;
        const newWeekTable = await WeekTable.create({ classId, duration, startTime, endTime, firstDay, lastDay, lessonNum });
        res.status(201).json(newWeekTable);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Get all week table entries
const getAllWeekTables = async (req, res) => {
    try {
        const weekTables = await WeekTable.find().populate('classId', 'name');
        res.json(weekTables);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Get week table entry by ID
const getWeekTableById = async (req, res) => {
    try {
        const weekTable = await WeekTable.findOne({ classId: req.params.id }).populate('classId', 'name');
        if (!weekTable) return res.status(404).json({ msg: 'Week table entry not found' });
        res.json(weekTable);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Update week table entry by ID
const updateWeekTableById = async (req, res) => {
    try {
        const { classId, numOfDays, lessonNum, startTime, endTime } = req.body;
        const updatedWeekTable = await WeekTable.findByIdAndUpdate(
            req.params.id,
            { classId, numOfDays, lessonNum, startTime, endTime },
            { new: true }
        ).populate('classId', 'name');
        if (!updatedWeekTable) return res.status(404).json({ msg: 'Week table entry not found' });
        res.json(updatedWeekTable);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Delete week table entry by ID
const deleteWeekTableById = async (req, res) => {
    try {
        const deletedWeekTable = await WeekTable.findByIdAndDelete(req.params.id);
        if (!deletedWeekTable) return res.status(404).json({ msg: 'Week table entry not found' });
        res.json({ msg: 'Week table entry deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};







module.exports = {
    addNewCellInTable,
    updateCellInTableById,
    getCellInTheTableById,
    getCellsInTableByClassId,
    deleteCellById,
    deleteWeekTableCellsByClassId,
    createWeekTable,
    getAllWeekTables,
    getWeekTableById,
    updateWeekTableById,
    deleteWeekTableById
}