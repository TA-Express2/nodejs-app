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

    it('check log in and menus as admin', (done) => {
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
            .then((btngrds) => {
                driver.actions().mouseMove(btngrds).perform();
			    driver.sleep(5000);
                driver.quit();
            })
            .then(() => {
                const grade1 = driver.findElement(
                    webdriver.By.xpath('//a[contains(text(), "11A")]')
                );
                return driver.wait(webdriver.until.elementIsVisible(grade1), 300);
            })
            .then((gr) => {
                gr.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#nav-btn-grades')
                );
            })
            .then((btngrds) => {
                driver.actions().mouseMove(btngrds).perform();
			    driver.sleep(5000);
                driver.quit();
            })
            .then(() => {
                const grade2 = driver.findElement(
                    webdriver.By.xpath('//a[contains(text(), "12A")]')
                );
                return driver.wait(webdriver.until.elementIsVisible(grade2), 300);
            })
            .then((gr2) => {
                gr2.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#nav-btn-grades')
                );
            })
            .then((btngrds) => {
                driver.actions().mouseMove(btngrds).perform();
			    driver.sleep(5000);
                driver.quit();
            })
            .then(() => {
                const grade3 = driver.findElement(
                    webdriver.By.xpath('//a[contains(text(), "12A")]')
                );
                return driver.wait(webdriver.until.elementIsVisible(grade3), 300);
            })
            .then((gr3) => {
                gr3.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#nav-btn-users')
                );
            })
            .then((e) => {
                driver.actions().mouseMove(e).perform();
			    driver.sleep(5000);
                driver.quit();
            })
            .then(() => {
                const student = driver.findElement(
                    webdriver.By.xpath('//a[contains(text(), "students")]')
                );
                return driver.wait(webdriver.until.elementIsVisible(student), 300);
            })
            .then((s) => {
                s.click();
            })
            .then(() => {
                const add = driver.findElement(
                    webdriver.By.xpath('//a[contains(text(), "Add Student")]')
                );
                return driver.wait(webdriver.until.elementIsVisible(add), 300);
            })
            .then((s) => {
                s.click();
            })
            .then(done, done);
    });
});
