/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const webdriver = require('selenium-webdriver');
const appUrl = 'http://localhost:3001';
const ui = require('../utils/ui');


describe('TEST NAVIGATON ROUTES', () => {
    let driver = null;

    beforeEach(() => {
        driver = setupDriver('chrome');
        driver.get(appUrl);
    });

    it('Test navigation routes for not logged in users', (done) => {
        Promise.resolve()
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#nav-btn-markbook')
                );
            })
            .then((btnmkb) => {
                btnmkb.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#nav-btn-grades')
                );
            })
            .then((btngrd) => {
                btngrd.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#nav-btn-login')
                );
            })
            .then((btnlgn) => {
                btnlgn.click();
            })
            .then(done, done);
    });
        it('Test navigation routes for logged in users(admin)', (done) => {
        Promise.resolve()
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#nav-btn-login')
                );
            })
            .then((navbtnlgn) => {
                navbtnlgn.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#input-email')
                );
            })
            .then((el) => {
                el.sendKeys('admin@admin.com');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#input-pass')
                );
            })
            .then((inputpass) => {
                inputpass.sendKeys('admin');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#btn-login')
                );
            })
            .then((btnlgn) => {
                btnlgn.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#nav-btn-grades')
                );
            })
            .then((btngrd) => {
                btngrd.click();
            })
            .then(done, done);
    });
});

