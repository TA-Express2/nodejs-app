const BaseData = require('./base.data');
const Student = require('../models/student.model');

class StudentsData extends BaseData {
    constructor(db) {
        super(db, Student, Student);
    }

    _isModelValid(model) {
        // custom validation
        return super._isModelValid(model);
    }
}

module.exports = StudentsData;
