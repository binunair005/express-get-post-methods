const express = require('express')
const path = require('path')

// Import the file "./students.json"
// The "./" is important
const students = require('./students')

const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  console.log(req)
  res.render('index')
})

app.get('/students', (req, res) => {
  res.render('students', {
    students
  })
})

// This route match any URL like 
//  - /students/7
//  - /students/abcdef
app.get('/students/:index', (req, res) => {
  console.log('DEBUG req.url', req.url);
  console.log('DEBUG req.params', req.params);

  let i = Number(req.params.index)
  // i is equal to the value in the end of the URL

  // If there is an 
  if (Number.isNaN(i) || !students[i]) {
    res.render('error') // render 'error.hbs'
  }
  else {
    res.render('student-detail', {
      student: students[i]
    })
  }
})


// http://localhost:3000/a/b/c/d

app.get('/:a/b/:c/:d', (req, res) => {
  console.log(req.params.a) // => a
  console.log(req.params.b) // => undefined
  console.log(req.params.c) // => c
  console.log(req.params.d) // => d
})



app.listen(3000, () => {
  console.log("Server running on port 3000");
})