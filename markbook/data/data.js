const { StudentsData } = require('./students.data');
const $ = require('jquery');

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

        //const user = usersList.find((u) => u.id === id)
        function findUser(student) {
            studentId = parseInt(student.id, 10);
            return studentId = id;
        }
        const user = usersList.find(findUser);
        console.log(`FIND BY ID => ${user.username}`)

        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No user with such id!');
            }
            return resolve(user);
        });
    },
    findByUsername(username, usersList) {
        //console.log(username);
        //console.log(usersList[0].info)
        // console.log(usersList);
        // const usernameToLower = username.toLowerCase();

        //const user = usersList.find((u) => u.username.toLowerCase() === usernameToLower);

        function findUser(student) {
            return student.username = username;
        }

        const user = usersList.find(findUser);
        //console.log(user.username);
        //console.log(`FIND BY USERNAME => ${user}`)

        return new Promise((resolve, reject) => {
            //console.log(user)
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