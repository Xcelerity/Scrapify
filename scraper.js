import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

export async function scrapeData(url) {
 
  let options = new chrome.Options();
  options.addArguments('--headless'); 
  options.addArguments('--disable-gpu'); 
  options.addArguments('--no-sandbox'); 
  options.addArguments('--disable-dev-shm-usage'); 

  
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

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




