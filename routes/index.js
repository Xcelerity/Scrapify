import { Router } from 'express';
const router = Router();
import ScrapedData from '../models/scrapedData.js';
import { Builder, By } from 'selenium-webdriver';
import { join } from 'path';

router.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

router.post('/scrape', async (req, res) => {
  const { url, name } = req.body;
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get(url);
    let data = await driver.findElement(By.tagName('body')).getText();
    let scrapedData = new ScrapedData({ name, data });
    await scrapedData.save();
    res.redirect('/collection');
  } finally {
    await driver.quit();
  }
});

router.get('/collection', async (req, res) => {
  let data = await ScrapedData.find();
  res.render('collection', { data });
});

router.get('/collection/:name', async (req, res) => {
  let name = req.params.name;
  let data = await ScrapedData.findOne({ name });
  res.render('data', { data });
});

export default router;