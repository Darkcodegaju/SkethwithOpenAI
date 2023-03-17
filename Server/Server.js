
const express = require('express');
const axios = require('axios');


const app = express();

app.get('/download-image', async (req, res) => {
  try {
    const imageUrl = req.query.url;
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const headers = {
      'Content-Type': response.headers['content-type'],
      'Content-Length': response.headers['content-length'],
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
    };
    res.set(headers);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
