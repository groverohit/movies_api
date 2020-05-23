const http = require('http'),
  url = require('url'),
  fs = require('fs');

http
  .createServer((request, response) => {
    let addr = request.url,
      q = url.parse(addr, true),
      filePath = '';

    if (q.pathname.includes('documentation')) {
      filePath = __dirname + '/documentation.html';
    } else {
      filePath = __dirname + '/index.html';
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }

      fs.appendFile(
        'log.txt',
        'URL: ' + addr + '\ntimestamp:' + new Date(),
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log('Log added');
          }
        }
      );

      response.writeHead(200, { 'content-type': 'text/plain' });
      response.write(data);
      response.end();
    });
  })
  .listen(8080);

console.log('Web Server is running on port 8080');
