const User = require('./user.model');

class Student extends User {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.firstName === 'string' &&
            model.firstName.length > 1 &&
            model.lastName === 'string' &&
            model.lastName.length > 1;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Student();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Student;
