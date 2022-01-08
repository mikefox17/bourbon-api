const axios = require('axios');
const cheerio = require('cheerio');

const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from Node.js');
});

server.listen(PORT, () => {
    console.table(`Server running on ${PORT}`);
});

const url = 'https://whiskeyraiders.com/archive/';

//this grabs all of the href links from the table

axios.get(url).then(response => {
    const $ = cheerio.load(response.data);
    const allLinks = [];
    $('#table > tbody > tr > td > a').each((i, el) => {
        const link = $(el).attr('href');
        allLinks.push(link);
    });
    console.log(allLinks);
});
