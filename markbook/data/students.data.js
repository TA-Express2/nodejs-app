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
            number: id,
        });
    }

    getCollectionCount() {
        return this.collection.count();
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
