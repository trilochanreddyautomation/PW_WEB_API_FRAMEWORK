import { test, expect } from '../src/fixtures/pagefixture';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

});

test('Verify Product Header', async ({ homePage, searchResultsPage, productInfoPage, page }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    await page.waitForTimeout(2000);
    expect(await productInfoPage.getProductHeader()).toBe('MacBook Pro');
    //await page.pause();
});


test('Verify Product Images Count', async ({ homePage, searchResultsPage, productInfoPage, page }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    expect(await productInfoPage.getProductImagesCount()).toBe(4);
    //await page.pause();
});

test('Verify Product Information/Data', async ({ homePage, searchResultsPage, productInfoPage, page }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    await page.waitForTimeout(2000);
    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log('Actual Product Details', actualProductInfoMap);
    expect.soft(actualProductInfoMap.get('productheader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('productImagesCount')).toBe(4);
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfoMap.get('Availability')).toBe('Out Of Stock');
    expect.soft(actualProductInfoMap.get('ProductPrice')).toBe('$2,000.00');
    expect.soft(actualProductInfoMap.get('ExternalTaxPrice')).toBe('$2,000.00');

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
