const StudentsData = require('./students.data');

const init = (db) => {
    return Promise.resolve({
        items: new StudentsData(db),
    });
};

module.exports = { init };
