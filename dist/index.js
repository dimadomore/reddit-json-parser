'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var request = require('request');
var fs = require('fs');

var catCount = process.argv[2];
var themCount = process.argv[3];

var mainlink = "https://www.reddit.com";
var category = [];
var theme = {};

request(mainlink + '/subreddits.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    for (var i = 0; i < catCount; i++) {
      category[i] = JSON.parse(body).data.children[i].data.url;
      console.log(category[i]);
      theme.url = [];
      theme.title = [];

      request(mainlink + category[i] + '.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          for (var j = 0; j < themCount; j++) {
            theme.url[j] = JSON.parse(body).data.children[j].data.url;
            theme.title[j] = JSON.parse(body).data.children[j].data.title;
            console.log(_typeof(theme.url[j]));
            console.log(_typeof(theme.title[j]));
          }
        }
      });
    }
  }
});

var html = function html(category, title, url) {
  var header = category;
  var body = '';

  // concatenate body string

  return '<!DOCTYPE html>' + '<html><header>' + header + '</header><body>' + body + '</body></html>';
};

fs.writeFile(category + ".html", html, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});