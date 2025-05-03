const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json()) // to read requests format in JSON

app.post('/blogs', (req, res) => {
  // const content = req.body.content
  // const title = req.body.title
  const { title, content } = req.body
  fs.writeFileSync(title, content)
  res.end('ok')
})

app.put('/posts/:title', (req, res) => {
  // console.log(req.query)
  const { title, content } = req.body
  if (title || content) {
    if (fs.existsSync(title)) {
      fs.writeFileSync(title, content)
      res.end('ok')
    } else {
      res.end('This post does not exist!')
    }
  } else {
    res.end('the request does not have a title and/or content')
  }
})

app.delete('/blogs/:title', (req, res) => {
  // console.log(req.params.title)
  const title = req.params.title
  if (fs.existsSync(title)) { 
    fs.unlinkSync(title);
    res.end('ok');
  } else {
    res.end('This blog does not exist!')
  }
})

app.get('/blogs/:title', (req, res) => {

  // How to get the title from the url parameters?
  const title = req.params.title
  // check if post exists
  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);
    res.end(`Your post content is: ${post}`)
  } else {
    res.end('This post does not exist!')
  }


  // send response
})

// YOUR CODE GOES IN HERE
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log(`server started on http://localhost:3000`)
})
