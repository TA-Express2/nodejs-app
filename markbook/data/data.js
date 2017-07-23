const seed = require('../db/users.json');
const StudentsData = require('./students.data');

/* const usersList = [{
    id: 1,
    username: 'S00001',
    password: 'asdfg',
    name: 'Nadezhda Grozdeva',
    egn: 9502130058,
    address: 'V. Tyrnovo',
    grade: 12,
    phone: 56983446,
    parentName: 'Ivanka Ivanova',
    parentAddress: 'V. Tyrnovo',
    parentPhone: 21149764145,
    info: 'from data.js'
}];*/

const init = async(db) => {
    // seed data
    let collectionAdmins = db.collection('admins');
    await collectionAdmins.count() === 0 && collectionAdmins.insert(seed.admins);
    let collectionStudents = db.collection('students');
    await collectionStudents.count() === 0 && collectionStudents.insert(seed.students);
    let collectionTeachers = db.collection('teachers');
    await collectionTeachers.count() === 0 && collectionTeachers.insert(seed.teachers);

    return Promise.resolve({
        students: new StudentsData(db),
    });
};

module.exports = {
    init,
};