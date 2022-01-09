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

//this grabs all of the href links from the table
const getData = () => {
    axios.get(url).then(response => {
        const allLinks = [];
        const $ = cheerio.load(response.data);
        $('#table > tbody > tr > td > a').each((i, el) => {
            const link = $(el).attr('href');
            allLinks.push(link);
        });

        //loop through all of the links and get the ABV data
        //this crashes after like 200 links
        const getAbv = () => {
            for (link of allLinks) {
                axios.get(link).then(response => {
                    const $ = cheerio.load(response.data);
                    const abv = $(
                        '#spirit-entry-body > div > div > section.o-spirit-stats-section.o-spirit-entry-section > ul > li.o-spirit-stat-list-item.o-spirit-stat_abv > p'
                    ).text();
                    console.log(`abv: ${abv}`);
                });
            }
        };
        getAbv();
    });
};

getData();
/* const abv = $(
    '#spirit-entry-body > div > div > section.o-spirit-stats-section.o-spirit-entry-section > ul > li.o-spirit-stat-list-item.o-spirit-stat_abv > p'
).text(); */
//hoisted so it returns an ampty array not sure how to fix
