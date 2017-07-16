const usersList = [{
    id: 1,
    username: 'nadeto',
    password: 'asdfg',
}];


const studentsMockUp = [
    {
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
        console.log(user);
        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No user with such username!');
            }
            return resolve(user);
        });
    },
};

module.exports = {
    users,
};
