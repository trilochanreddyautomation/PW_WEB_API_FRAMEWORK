import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;

    //common locators across all pages
    protected readonly logo: Locator;
    protected readonly searchBox: Locator;
    protected readonly searchIcon: Locator;
    protected readonly footerLinks: Locator;
    protected readonly curreny: Locator;
    protected readonly cartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByRole('img', { name: 'naveenopencart' });
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('div#search button');
        this.footerLinks = page.locator('footer a');
        this.curreny = page.locator('form#form-currency');
        this.cartButton = page.locator('div#cart button')
    }

    //App Common features/actions:footer,logo,search

    async isLogoVisible(): Promise<boolean> {
        return await this.logo.isVisible();
    }

    async isSearchBoxVisible(): Promise<boolean> {
        return await this.searchBox.isVisible();
    }

    async isCurrenyVisible(): Promise<boolean> {
        return await this.curreny.isVisible();
    }

    async isCartButtonVisible(): Promise<boolean> {
        return await this.cartButton.isVisible();
    }

    async getPageFootersCount(): Promise<Number> {
        return await this.footerLinks.count();
    }

    async getPageFooters(): Promise<string[]> {
        return await this.footerLinks.allInnerTexts();
    }

    //Page level generic methods
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    getCurrentURL(): string {
        return this.page.url();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('load');
    }
    async takeScreenshot(name: string) {
        return await this.page.screenshot({
            fullPage: true,
            path: `reports/screenshot/${name}.png`
        })

    }
}