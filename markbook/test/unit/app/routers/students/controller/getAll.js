const { expect } = require('chai');

const { init } = require('../../../../../../app/routers/students/controller');

describe('students controller', () => {
    let data = null;
    let controller = null;

    let req = null;
    let res = null;

    const students = {
            number: 'S0001',
            firstName: 'Nadezhda',
            lastName: 'Grozdeva',
            egn: '9502222222',
            email: 'nadeto@gmail.com',
            gender: 'female',
            grade: '11A',
            status: 'active',
            address: 'V. Turnovo',
            parentName: 'Maria Grozdeva',
            parentPhone: '123',
            marks: [{
                    Math: [5, 4, 6],
                    name: 'Math',
                },
                {
                    Literature: [6],
                    name: 'Literature',
                },
                {
                    Chemistry: [5, 6],
                    name: 'Chemistry',
                },
                {
                    Biology: [5, 6],
                    name: 'Biology',
                },
                {
                    History: [5, 6],
                    name: 'History',
                },
            ],
    };

    beforeEach(() => {
        data = {
            students: {
                getAll(model) {
                    return Promise.resolve(students);
                },
            },
        };

        controller = init(data);
        req = require('../../../../req-res').getRequestMock();
        res = require('../../../../req-res').getResponseMock();
    });

    it('expect get all to return students', () => {
        controller.getAll(req, res)
        .then(() => {
            expect(res.context).to.be.deep.equal({
                model: students,
            });
            expect(res.viewName).to.be.deep.equal('students/listAll');
        });
    });
});
