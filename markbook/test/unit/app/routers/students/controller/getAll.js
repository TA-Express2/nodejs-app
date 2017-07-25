const { expect } = require('chai');

const { init } = require('../../../../../../app/routers/students/controller');

describe('students controler', () => {
    let data = null;
    let controller = null;
    const students = [1, 2, 3, 4];

    let req = null;
    let res = null;

    beforeEach(() => {
        data = {
            students: {
                getAll() {
                    return Promise.resolve(students);
                },
            },
        };

        controller = init(data);
        req = require('../../../../req-res').getRequestMock();
        res = require('../../../../req-res').getResponseMock();
    });
    it('expect get all to return students', () => {
        return controller.getAll(req, res)
        .then(() => {
            expect(res.context).to.be.equal({
                title: 'Students',
                model: students,
            });
            expect(res.viewName).to.be.deep.equal('students/listAll');
        });
    });
});
