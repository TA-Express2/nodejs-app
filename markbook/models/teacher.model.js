const User = require('./user.model');

class Teacher extends User {
    static isValid(model) {
        return typeof model !== 'undefined';
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    static toViewModel(model) {
        const viewModel = new Teacher();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Teacher;
