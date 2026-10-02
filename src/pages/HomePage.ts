import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    private readonly logoutLink: Locator;
    private readonly headers: Locator;


    constructor(page: Page) {
        super(page);
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', { level: 2 });


    }

    async getHomePageTitle(): Promise<string> {
        return await this.page.title();
    }

    async isLogoutLinkExist(): Promise<Boolean> {
        return await this.logoutLink.isVisible();
    }

    async getHomeHeaders(): Promise<string[]> {
        return await this.headers.allInnerTexts();
    }

    async doSearch(searchKey: string): Promise<void> {
        console.log('search key :', searchKey);
        await this.searchBox.fill(searchKey);
        await this.searchIcon.click();

    }


}