const users = {
    findById(id, usersList) {
        id = JSON.stringify(id);

        let user;
        usersList.forEach((users) => {
            users.find((student) => {
                if (JSON.stringify(student._id) === id) {
                    return user = student;
                }
                return user;
            });
            return user;
        });

        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No user with such id!');
            }
            return resolve(user);
        });
    },
    findByUsername(username, usersList) {
        let user;
        usersList.forEach((users) => {
            users.find((student) => {
                if (student.email === username) {
                    return user = student;
                }
                return user;
            });
            return user;
        })

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