const init = (app, data) => {
    const controller = {
        getRegView(req, res) {
            return res.render('login', {
                title: 'Log in',
            });
        },
    };
    return controller;
};

module.exports = {
    init,
};
