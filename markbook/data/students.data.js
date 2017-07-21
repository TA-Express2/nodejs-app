const BaseData = require('./base.data');
const Student = require('../models/student.model');

class StudentsData extends BaseData {
    constructor(db) {
        super(db, Student, Student);
    }

    // findById(id) {
    //     return this.collection.findOne({
    //         _id: new ObjectID(id),
    //     });
    // }

    findByNumber(id) {
        return this.collection.findOne({
            number: id
        });
    }

    _isModelValid(model) {
        // custom validation
        return super._isModelValid(model);
    }
}

module.exports = StudentsData;
