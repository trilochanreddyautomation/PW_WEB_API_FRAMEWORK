import { test, expect } from '../src/fixtures/pagefixture';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
})


test('@smoke home page title test', async ({ homePage }) => {

    let homePageTitle = await homePage.getHomePageTitle();
    console.log(homePageTitle);
    expect(homePageTitle).toBe("My Account");

})

test('@smoke logout link exist test', async ({ homePage }) => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
})

test('@regression home page headers exist test', async ({ homePage }) => {

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
test('@smoke App logo exists on login page',async ({basePage}) =>{
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('@smoke search box exists on login page',async ({basePage}) =>{
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
}) 


test('@smoke Cart exists on login page',async ({basePage}) =>{
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
}) 

test('@smoke Footer exists on login page',async ({basePage}) =>{
    expect(await basePage.getPageFootersCount()).toBe(16);

}) 