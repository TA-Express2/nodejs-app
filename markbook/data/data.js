const { StudentsData } = require('./students.data');

/*const usersList = [{
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


const studentsMockUp = [{
        name: 'Ivan Ivanov',
        gender: 'male',
        grade: '11',
    },
    {
        name: 'Angel Stoyanov',
        gender: 'male',
        grade: '11',
    },
    {
        name: 'Ralitsa Pavlova',
        gender: 'female',
        grade: '11',
    },
    {
        name: 'Kristina Raeva',
        gender: 'female',
        grade: '10',
    },
];


const init = (db) => {
    return Promise.resolve({
        students: new StudentsData(db),
    });
};

const users = {
    findById(id, usersList) {
        id = parseInt(id, 10);

        const user = usersList.find((student) => {
            return student.id === id;
        });

        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No user with such id!');
            }
            return resolve(user);
        });
    },
    findByUsername(username, usersList) {
        const user = usersList.find((student) => {
            return student.username === username;
        });

        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No user with such username!');
            }
            console.log(`PROMISE FINDUSER => ${user.id}`)
            return resolve(user);
        });
    },
};


module.exports = {
    init,
    users,
    students: require('./students.data'),
};
