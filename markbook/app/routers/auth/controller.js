const init = (app, data) => {
    const controller = {
        getLoginView(req, res) {
            return res.render('users/login', {
                title: 'Log in',
            });
        },
    };
    return controller;
};

module.exports = {
    init,
};
