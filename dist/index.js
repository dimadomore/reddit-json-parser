'use strict';

var request = require('request');
var fs = require('fs');

var catCount = process.argv[2];
var themCount = process.argv[3];

var mainlink = "https://www.reddit.com";
var category = [];
var post = {};
var fileNme = '';
var u = 0;

var html = function html(category, title, url) {
  var title = category;
  var css = '\t\t<link rel="stylesheet" href="../styles.css">\n';
  var body = '<ul>\n';
  for (var i = 0; i < themCount; i++) {
    body += '\t\t\t<li><a href="' + url + '">' + title + '</a></li>\n';
  }
  body += '\t\t</ul>';

  return '<!DOCTYPE html>\n' + '<html>\n\t<head>\n\t\t<title>' + title + '</title>\n' + css + '\t</head>\n\t<body>\n\t\t' + body + '\n\t</body>\n</html>';
};

request(mainlink + '/subreddits.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var _loop = function _loop(i) {
      category[i] = JSON.parse(body).data.children[i].data.url;

      post.url = [];
      post.title = [];

      request(mainlink + category[i] + '.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          for (var j = 0; j < themCount; j++) {
            post.url[j] = JSON.parse(body).data.children[j].data.url;
            post.title[j] = JSON.parse(body).data.children[j].data.title;

            fileName = category[i].split('/')[2];
            fs.writeFile('reddit/' + fileName + '.html', html(fileName, post.title[j], post.url[j]), function (err) {
              if (err) {
                return console.log(err);
              }
              console.log("The file was saved!");
            });
          }
        }
      });
    };

    for (var i = 0; i < catCount; i++) {
      _loop(i);
    }
  }
});