import { Locator } from '@playwright/test';

export class CartPage {

    private readonly logoutLink: Locator;


    async isLogoutLinkExist(): Promise<Boolean> {
        return await this.logoutLink.isVisible();
    }
}