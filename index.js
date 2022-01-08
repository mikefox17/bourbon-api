const axios = require('axios');
const cheerio = require('cheerio');
const http = require('http');
const PORT = 3000;
//run npm start on the terminal to start the server
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from Node.js');
});

server.listen(PORT, () => {
    console.table(`Server running on ${PORT}`);
});

const url = 'https://whiskeyraiders.com/archive/';
//this cant be populated outside of the get
const allLinks = [];
//this grabs all of the href links from the table
axios.get(url).then(response => {
    const $ = cheerio.load(response.data);
    $('#table > tbody > tr > td > a').each((i, el) => {
        const link = $(el).attr('href');
        allLinks.push(link);
    });
    console.log(allLinks);
});

//hoisted so it returns an ampty array not sure how to fix
console.log(allLinks);
