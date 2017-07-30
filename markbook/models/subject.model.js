class Subject {
    // constructor(subject) {
        // this.id = id;
        // this.subject = subject;
        // this.teacher = teacher;
    // }

    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.subject === 'string' &&
            model.subject.length > 3;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    // get subject() {
    //     return this.subject;
    // }

    // set subject(value) {
    //     this.subject = value;
    // }

    // get teacher() {
    //     return this.teacher;
    // }

    // set teacher(value) {
    //     this.teacher = value;
    // }

    static toViewModel(model) {
        const viewModel = new Subject();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Subject;
