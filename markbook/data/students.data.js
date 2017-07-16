const studentsMockUp = require('../db/users.json');

const init = (db) => {
    console.log('***********db*********', db);
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

module.exports = init;
