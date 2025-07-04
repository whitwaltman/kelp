import { test, expect } from '@playwright/test';

/**
 * Wait for a custom event to run
 * @param  {Locator} component The component to listen for the event on
 * @param  {String}  eventName The event name to listen for
 * @return {Promise}           Resolves to true if event emits
 */
export async function waitForCustomEvent(component, eventID) {
	return await component.evaluate((element, eventID) => {
		return new Promise((resolve) => {
			return element.addEventListener(eventID, () => {
				return resolve(true);
			});
		});
	}, eventID);
}

/**
 * Test that component setup was completed
 * @param  {String}  selector The component selector
 * @param  {String}  url      The URL to navigate to
 */
export async function testComponentReadyState(selector, url) {
	test('component instantiates', async ({ page }) => {
		let isReady = false;
		page.on('console', msg => {
			if (msg.text() !== 'ready') return;
			isReady = true;
		});
		await page.goto(url);
		expect(isReady).toEqual(true);
		await expect(page.locator(selector).first()).toHaveAttribute('is-ready');
	});
}
