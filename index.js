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
    console.log(`Server running on ${PORT}`);
});

const url = 'https://whiskeyraiders.com/archive/';
const classHtml = '.o-archive__table-title-link';

axios.get(url).then(response => {
    const $ = cheerio.load(response.data);
    $(classHtml).each((i, el) => {
        let titles = [];
        console.log(el);
        titles = $(el).text();
        console.log(titles);
    });
});
