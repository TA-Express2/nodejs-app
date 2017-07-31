const BaseData = require('./base.data');
const Subject = require('../models/subject.model');

class SubjectsData extends BaseData {
    constructor(db) {
        super(db, Subject, Subject);
    }

    findByName(name) {
        return this.collection.findOne({
            subject: name,
        });
    }

    updateSubject(subject, data) {
        return this.collection.update(subject, data);
    }
}

module.exports = SubjectsData;
