const BaseData = require('./base.data');
const Admin = require('../models/admin.model');

class AdminsData extends BaseData {
    constructor(db) {
        super(db, Admin, Admin);
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

module.exports = AdminsData;
