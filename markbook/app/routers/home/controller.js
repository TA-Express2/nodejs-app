const init = (app) => {
    const controller = {
        getHomeView(req, res) {
                    return res.render('home', {
                        title: 'Home',
                    });
        },
    };

    return controller;
};

module.exports = {
    init,
};
