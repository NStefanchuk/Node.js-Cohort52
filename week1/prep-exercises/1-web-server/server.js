/**
 * Exercise 3: Create an HTTP web server
 */
const fs = require('fs').promises
const path = require('path') 
const http = require('http')

//create a server
let server = http.createServer(async function (req, res) {
  // YOUR CODE GOES IN HERE
  try {
    if (req.url === '/') {
      const data = await fs.readFile(path.join(__dirname, 'index.html'))
      res.writeHead(200, {
        'Content-Type': 'text/html',
      })
      res.end(data)
    } else if (req.url === '/index.js') {
      const data = await fs.readFile(path.join(__dirname, 'index.js'))
      res.writeHead(200, {
        'Content-Type': 'application/javascript',
      })
      res.end(data)
    } else {
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      })
      res.end('404 not found')
    }
  } catch (err) {
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    })
    res.end('server error')
    console.error(err)
  }
  //   res.write('Hello World!') // Sends a response back to the client
  //   res.end() // Ends the response
})

server.listen(3000, () => {
  console.log('server is running (listen on port 3000)')
}) // The server starts to listen on port 3000
