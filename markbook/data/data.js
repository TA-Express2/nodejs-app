const { StudentsData } = require('./students.data');

const usersList = [{
    id: 1,
    username: 'nadeto',
    password: 'asdfg',
    name: 'Nadezhda Grozdeva',
    egn: 9502130058,
    address: 'V. Tyrnovo',
    grade: 12,
    phone: 56983446,
    parentName: 'Ivanka Ivanova',
    parentAddress: 'V. Tyrnovo',
    parentPhone: 21149764145
}];


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
    findById(id) {
        id = parseInt(id, 10);
        const user = usersList.find((u) => u.id === id)
        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No user with such id!');
            }
            return resolve(user);
        });
    },
    findByUsername(username) {
        const usernameToLower = username.toLowerCase();
        const user = usersList.find((u) => u.username.toLowerCase() === usernameToLower);
        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No user with such username!');
            }
            return resolve(user);
        });
    },
};


module.exports = {
    init,
    users,
    students: require('./students.data'),
};