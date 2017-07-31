const BaseData = require('./base.data');
const Student = require('../models/student.model');

class StudentsData extends BaseData {
    constructor(db) {
        super(db, Student, Student);
    }

    getDistinctMarks(field, props) {
        return this.collection.distinct(field, props);
    }

    updateStudent(student, data) {
        return this.collection.update(student, data);
    }

    _isModelValid(model) {
        // custom validation
        return super._isModelValid(model);
    }
}

module.exports = StudentsData;
