const http = require('http');
const { json } = require('stream/consumers');

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {
    // Parse the body of the request as JSON if Content-Type header is
      // application/json
    // Parse the body of the request as x-www-form-urlencoded if Content-Type
      // header is x-www-form-urlencoded
    if (reqBody) {
      // req.body = reqBody
      //   .split("&")
      //   .map((keyValuePair) => keyValuePair.split("="))
      //   .map(([key, value]) => [key, value.replace(/\+/g, " ")])
      //   .map(([key, value]) => [key, decodeURIComponent(value)])
      //   .reduce((acc, [key, value]) => {
      //     acc[key] = value;
      //     return acc;
      //   }, {});

      // Log the body of the request to the terminal
      if (req.headers['content-type'] === 'application/json') {
        req.body = JSON.parse(reqBody)
      }
      console.log(req.body);
    }

    if (req.headers['content-type'] === 'x-www-form-urlencoded') {
      if (reqBody) {
          req.body = reqBody
            .split("&")
            .map((keyValuePair) => keyValuePair.split("="))
            .map(([key, value]) => [key, value.replace(/\+/g, " ")])
            .map(([key, value]) => [key, decodeURIComponent(value)])
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {});

          // Log the body of the request to the terminal
          console.log(req.body);
        }
    }
    const resBody = {
      "Hello": "World!"
    };

    // Return the `resBody` object as JSON in the body of the response
    res.statusCode = 200
    res.setHeader('Content-Type, application/json')
    res.body = JSON.stringify(resBody)
    return res.end(res.body)
  });
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
