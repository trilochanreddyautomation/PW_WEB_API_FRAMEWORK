import { test, expect } from '../src/fixtures/pagefixture';
import { CsvHelper } from '../src/utils/CSVHelper';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!)
})

//data provider
let productData = CsvHelper.readCsv('src/testdata/product.csv');
for (let row of productData) {
    test(`Verify Search Results Count - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage }) => {
        await homePage.doSearch(row.searchkey);
        let actualResultsCount = await searchResultsPage.getProductSearchResultsCount();
        console.log('Search Results Count : ', actualResultsCount);
        expect(actualResultsCount).toBe(Number(row.resultcount));
    });
}

for (let row of productData) {
    test(`Verify User is able to land on the product page - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage, page }) => {
        await homePage.doSearch(row.searchkey);
        await searchResultsPage.selectProduct(row.productname);
        await page.waitForTimeout(2000);
        expect(await page.title()).toBe(row.productname);
    })
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

