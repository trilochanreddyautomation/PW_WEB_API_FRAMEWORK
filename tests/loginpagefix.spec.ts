

import { test, expect } from '../src/fixtures/pagefixture';
import { CsvHelper } from '../src/utils/CSVHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper'
import { JsonHelper } from '../src/utils/JsonHelper'
import * as allure from "allure-js-commons";


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
});


test('login page title test', async ({ loginPage }) => {
    let pageTitle = await loginPage.getPageTitle();
    console.log("Login Page Title :", pageTitle);

    expect(pageTitle).toBe('Account Login');

})


test('forgot pwd link exist  test', async ({ loginPage }) => {
    expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
})

test('user is able to login to app with valid Creds', async ({ loginPage, homePage }) => {
    await allure.suite("Login Tests");
    await allure.severity("critical");
    await allure.feature("Authentication");
    await allure.story("Valid Login");
    await allure.description("Verify user can login with valid credentials");

    await allure.step("Login with valid creds", async () => {
        await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    });

    await allure.step("Verify logout link is visible", async () => {
        expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    });


    await allure.step("Verify logout home page title is visible", async () => {
        expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
    });

});

//pros:
//1.light weight,easy to maintain/read,3rd party lib,no license,flat files,fs
//DD_1:Read the csv data directky from the CSV file and loop the test method row wise...
let testCSVData = CsvHelper.readCsv('src/testdata/logindata.csv');
for (let row of testCSVData) {
    test(`user is able to login to app with invalid creds with Read CSV Data- ${row.username} - ${row.password}`, async ({ loginPage, homePage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}

//cons:
//1.Maintenance
//2.MS Licenses
//DD_2:Read the xlsx data directky from the xlsx file and loop the test method row wise...
let testExcelData = ExcelHelper.readExcel('src/testdata/opencarttestdata.xlsx', 'Sheet1');
for (let row of testExcelData) {
    test(`user is able to login to app with invalid creds with Read Excel Data - ${row.username} - ${row.password}`, async ({ loginPage, homePage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}


//pros:
//1.inbuilt method:parse,lightweight,smaller data source
//DD_3:Read the json data directky from the json file and loop the test method row wise...
let testJsonData = JsonHelper.readJson('src/testdata/logindata.json')
for (let row of testJsonData) {
    test(`user is able to login to app with invalid creds with Read Json Data- ${row.username} - ${row.password}`, async ({ loginPage, homePage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}

//common features test
test('App logo exists on login page',async ({basePage}) =>{
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('search box exists on login page',async ({basePage}) =>{
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
}) 


test('Cart exists on login page',async ({basePage}) =>{
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
}) 

test('Footer exists on login page',async ({basePage}) =>{
    expect(await basePage.getPageFootersCount()).toBe(16);

}) 