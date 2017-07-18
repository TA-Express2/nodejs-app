const BaseData = require('./base.data');
const Student = require('../models/student.model');
const studentsMockUp = require('../db/users.json');

class StudentsData extends BaseData {
    constructor(db) {
        super(db, Student, Student);
    }

    _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

const init = (db) => {
    const students = {
        getAllStudents() {
            const studentsList = studentsMockUp.get('students')
                .value();
            return Promise.resolve(studentsList);
        },
        getStudentById(id) {
            const student = db.get('students')
                .getStudentById(id)
                .value();
            return Promise.resolve(student || null);
        },
        create(name) {
            let student = { name };

            student = db.get('students')
                .insert(student).write();

            return Promise.resolve(student);
        },
    };
    return students;
};

module.exports = {
    init,
    StudentsData,
};
