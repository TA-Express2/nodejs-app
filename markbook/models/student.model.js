class Student {
    static isValid(model) {
        return typeof model !== 'undefined';
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
