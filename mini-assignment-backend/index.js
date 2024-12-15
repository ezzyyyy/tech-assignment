const express = require('express');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { renameColumn, preprocessData } = require('./helpers.js');

const app = express();
const port = 8000;

app.use(cors({ origin: 'http://localhost:3000' }));

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  res.send('Tech assessment backend');
});

app.post('/upload', upload.single('file'), (req, res) => {
  // console.log(req);

  const results = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', () => {
      // delete uploaded file after processing
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });

      // rename the wrongly named column
      const correctedData = renameColumn(results, '﻿"postId"', 'postId');

      // group comments by post
      const reformattedData = preprocessData(correctedData);

      const newData = {
        id: uuidv4(),
        data: reformattedData,
      };

      // save the processed data to a josn file
      const jsonFilePath = `uploads/${newData.id}.json`;
      fs.writeFile(jsonFilePath, JSON.stringify(newData, null, 2), (err) => {
        if (err) {
          console.error('Error saving JSON file:', err);
          return res.status(500).send({ error: 'Error saving JSON file' });
        }

        console.log('JSON file saved:', jsonFilePath);

        res.status(200).send({
          message: 'File processed successfully',
          id: newData.id,
          jsonFilePath,
        });
      });
    })
    .on('error', (err) => {
      console.error('Error reading CSV file:', err);
      res.status(500).send({ error: 'Error processing file' });
    });
});

app.get('/post', (req, res) => {
  const id = req.query.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;

  console.log('id', id);
  console.log('page', page);

  const jsonFilePath = `uploads/${id}.json`;

  // check that file exists
  if (!fs.existsSync(jsonFilePath)) {
    return res.status(404).send({ error: 'File not found' });
  }

  // read json
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).send({ error: 'Error reading JSON file' });
    }

    try {
      const parsedData = JSON.parse(data);
      const totalPosts = parsedData.data.length;
      const totalPages = Math.ceil(totalPosts / pageSize);

      // ensure within range
      if (page < 1 || page > totalPages) {
        return res.status(400).send({ error: 'Invalid page number' });
      }

      // get start and end for pagination
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedPosts = parsedData.data.slice(startIndex, endIndex);

      res.status(200).send({
        message: `Page ${page} of posts retrieved successfully`,
        currentPage: page,
        totalPages,
        postCount: totalPosts,
        posts: paginatedPosts,
      });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send({ error: 'Error parsing JSON file' });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
