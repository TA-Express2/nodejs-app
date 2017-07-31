/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const webdriver = require('selenium-webdriver');
const appUrl = 'http://localhost:3001';
const ui = require('../utils/ui');

describe('TEST LOGIN AS STUDENT/TEACHER/ADMIN', () => {
    let driver = null;

    beforeEach(() => {
        driver = setupDriver('chrome');
        driver.get(appUrl);
    });

    it('check log in as student', (done) => {
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
                el.sendKeys('nadeto@gmail.com');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#input-pass')
                );
            })
            .then((inputpass) => {
                inputpass.sendKeys('123');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#btn-login')
                );
            })
            .then((btnlgn) => {
                btnlgn.click();
            })
            .then(done, done);
    });

    it('check log in as teacher', (done) => {
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
                el.sendKeys('doncho@doncho.com');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#input-pass')
                );
            })
            .then((inputpass) => {
                inputpass.sendKeys('!123456qw*');
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#btn-login')
                );
            })
            .then((btnlgn) => {
                btnlgn.click();
            })
            .then(done, done);
    });

    it('check log in as admin', (done) => {
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
            .then(done, done);
    });
});

