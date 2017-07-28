const init = (app, data) => {
    const controller = {
        getHomeView(req, res) {
            return res.render('home', {
                currentUser: req.user,
                title: 'Home',
            });
        },
        getAboutView(req, res) {
            return res.render('about', {
                currentUser: req.user,
                title: 'About',
            });
        },
    };

    return controller;
};

module.exports = {
    init,
};
