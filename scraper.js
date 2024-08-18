import { Builder, By, until } from 'selenium-webdriver';

export async function scrapeData(url) {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get(url);
    await driver.wait(until.elementLocated(By.css('body')), 10000);
    let body = await driver.findElement(By.css('body')).getAttribute('innerHTML');
    return body;
  } catch (error) {
    console.error('Error scraping data:', error);
    throw error;
  } finally {
    await driver.quit();
  }
}


