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
  res.render('index') // Render "index.hbs"
})

app.get('/students', (req, res) => {
   // Render "students.hbs"  
  res.render('students', {
    students // give to the view a variable "student" that is the global variable "student"
  })
})

// This route match any URL like:
//  - /students/7
//  - /students/abcdef
app.get('/students/:index', (req, res) => {
  console.log('DEBUG req.url', req.url);
  console.log('DEBUG req.params', req.params);

  // i is equal to the value in the end of the URL
  let i = Number(req.params.index)

  // If there is a problem with "i"
  if (Number.isNaN(i) || !students[i]) {
    res.render('error') // render 'error.hbs'
  }
  else {
    res.render('student-detail', {
      student: students[i]
    })
  }
})

// Route to display the search form
app.get('/search', (req,res)=> {
  res.render('search')
})

// Route to display the result of the search
app.get('/search-result', (req,res)=> {
  // if the URL is "/search-result?q=abc&country=Germany"
  // => req.query = { q: 'abc', country: 'Germany' }
  console.log(req.query)

  let filteredStudents = students.filter(s => s.name.toUpperCase().includes(req.query.q.toUpperCase()))

  // If the user has selected a country
  if (req.query.country != "") {
    filteredStudents = filteredStudents.filter(s => s.country === req.query.country)
  }

  res.render('search-result', {
    students: filteredStudents
  })
})


app.listen(3000, () => {
  console.log("Server running on port 3000");
})