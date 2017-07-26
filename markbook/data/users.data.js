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
    findByEmail(email, usersList) {
        let user;
        usersList.forEach((users) => {
            users.find((student) => {
                if (student.email === email) {
                    return user = student;
                }
                return user;
            });
            return user;
        })

        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('User not found!');
            }
            return resolve(user);
        });
    },
};


module.exports = {
    users,
};
