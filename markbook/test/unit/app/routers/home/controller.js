const { expect } = require('chai');

const { init } = require('../../../../../app/routers/home/controller');

describe('home router', () => {
    const data = null;
    const app = null;
    let controller = null;
    const items = [1, 2, 3];
    let req = null;
    let res = null;

    beforeEach(() => {
        controller = init(app, data);
        req = require('../../../req-res').getRequestMock();
        res = require('../../../req-res').getResponseMock();
    });

    it('expects to get result', () => {
        return controller.getHomeView(req, res);
    });
});
