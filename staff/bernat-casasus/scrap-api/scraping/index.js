const axios = require('axios');
const cheerio = require ('cheerio');
const fs = require('fs');

const baseUrl = 'https://www.fotocasa.es/es/alquiler/pisos/barcelona-capital/';
const initialUrl = 'el-poblenou/l/';
let pageCount = 0;

function scrapeUrl(url, items=[]) {
    
    console.log('requesting', url);
    return axios.get(url)
        .then(response => {
            
            const $ = cheerio.load(response.data);
            const pageItems = $('.re-Searchresult-itemRow').toArray()
                    .map(item => {
                    
                    const $item = $(item);
                    
                    return {
                        title: $item.find('.re-Card-title').text(),
                        link: baseUrl + $item.find('.re-Card-link').attr('href'),
                        price: $item.find('.re-Card-price').text(),
                        rooms: $item.find('.re-Card-feature').text(),
                        
                    };
                });
            
                
            const allItems = items.concat(pageItems);
            console.log(pageItems.length,'items retrieved', allItems.length, 'acumulated');
            pageCount++
            const nextUrl = baseUrl + initialUrl + pageCount
            debugger;
            return (pageItems.length !==0) ? scrapeUrl(nextUrl, allItems) : allItems;
        })
        .catch(error => {
            console.log('error', error);
            return items;
        });
}

scrapeUrl(baseUrl + initialUrl)
    .then(items => {
        console.log('finish!');
        fs.writeFile('./items.json', JSON.stringify(items), 'utf8', function(error) {
            if (error) return console.log('error', error);
            console.log(items.length, 'items saved');
        }); 
    });