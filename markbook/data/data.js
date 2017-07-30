const seed = require('../db/users.json');
const UsersData = require('./users.data');
const AdminsData = require('./admins.data');
const StudentsData = require('./students.data');
const TeachersData = require('./teachers.data');
const SubjectsData = require('./subjects.data');

const init = async (db) => {
    // seed data
    const collectionUsers = db.collection('users');
    if (await collectionUsers.count() === 0) {
        collectionUsers.insert(seed.users);
    }
    const collectionAdmins = db.collection('admins');
    if (await collectionAdmins.count() === 0) {
        collectionAdmins.insert(seed.admins);
    }
    const collectionStudents = db.collection('students');
    if (await collectionStudents.count() === 0) {
        collectionStudents.insert(seed.students);
    }
    const collectionTeachers = db.collection('teachers');
    if (await collectionTeachers.count() === 0) {
        collectionTeachers.insert(seed.teachers);
    }
    const collectionSubjects = db.collection('subjects');
    if (await collectionSubjects.count() === 0) {
        collectionSubjects.insert(seed.subjects);
    }

    return Promise.resolve({
        users: new UsersData(db),
        admins: new AdminsData(db),
        students: new StudentsData(db),
        teachers: new TeachersData(db),
        subjects: new SubjectsData(db),
    });
};

module.exports = {
    init,
};
