import { test, expect } from '../src/fixtures/pagefixture';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
})


test('home page title test', async ({ homePage }) => {

    let homePageTitle = await homePage.getHomePageTitle();
    console.log(homePageTitle);
    expect(homePageTitle).toBe("My Account");

})

test('logout link exist test', async ({ homePage }) => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
})

test('home page headers exist test', async ({ homePage }) => {

    let allHeaders = await homePage.getHomeHeaders();
    console.log("home page headers :", allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])

})

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