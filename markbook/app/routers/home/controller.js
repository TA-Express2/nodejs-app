const init = (app, data) => {
    const controller = {
        getHomeView(req, res) {
            return res.render('home', {
                title: 'Home',
            })
        },
    };
    return controller;
};

module.exports = {
    init,
};

