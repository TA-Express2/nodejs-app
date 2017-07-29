const BaseData = require('./base.data');
const Teacher = require('../models/teacher.model');

class TeachersData extends BaseData {
    constructor(db) {
        super(db, Teacher, Teacher);
    }

    findByNumber(id) {
        return this.collection.findOne({
            number: id,
        });
    }

    getCollectionCount() {
        return this.collection.count();
    }

    _isModelValid(model) {
        // custom validation
        return super._isModelValid(model);
    }
}

module.exports = TeachersData;
