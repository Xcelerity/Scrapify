import express from 'express';
import { scrapeData } from '../scraper.js';
import { client } from '../app.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/scrape', async (req, res) => {
  try {
    const { url, name } = req.body;
    const scrapedData = await scrapeData(url);

    const db = client.db('webscraper');
    const collection = db.collection('data');
    await collection.insertOne({ name, data: scrapedData });

    res.redirect(`/collection/${name}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error scraping data');
  }
});

router.get('/collection/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const db = client.db('webscraper');
    const collection = db.collection('data');
    const data = await collection.findOne({ name });

    if (data) {
      res.render('data', { data });
    } else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

router.get('/collections', async (req, res) => {
  try {
    const db = client.db('webscraper');
    const collection = db.collection('data');
    const collections = await collection.find({}, { projection: { name: 1 } }).toArray();

    res.json(collections);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving collections');
  }
});

router.get('/collections.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/collections.html'));
});

export default router;









