const init = (app, data) => {
    const controller = {
        getHomeView(req, res) {
            return res.render('home', {
                title: 'Home',
            });
        },
        getAboutView(req, res) {
            return res.render('about', {
                title: 'About',
            });
        },
    };

    return controller;
};

module.exports = {
    init,
};
