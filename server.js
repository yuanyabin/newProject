// Express
let express = require('express')
let app = express()
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // res.sendfile(path.resolve('./public/dist/index.html'))
    next();
})
  
  // Server Listening @ 1337
//   app.listen(1337, () => console.log('Server running at 1337'))

const path = require('path')

// Static Folder
app.use(express.static(__dirname + '/public/dist'))

// Body Parser
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Morgan
let morgan = require('morgan')
app.use(morgan('dev'))

// Mongo Database
let mongoose = require('mongoose')

mongoose.connect('mongodb://mbdbk:nopass@ds249737.mlab.com:49737/kxdb', {useMongoClient: true}, function (err, db) {
  console.log('connect mlab ok...')
})

let UserSchema = new mongoose.Schema({
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  email: { type: String, require: true },
})

mongoose.model('CRUDUsers', UserSchema)
let User = mongoose.model('CRUDUsers')

// Routes
// Get Users
app.get('/api/users', (req, res, next) => {
  console.log("Server > GET '/users' ")
  User.find({}, (err, users) => {
    return res.json(users)
  })
})

// Get User
app.get('/api/users', (req, res, next) => {
  console.log("Server > GET '/users/:id' ")
  User.find({_id: req.body.id}, (err, users) => {
    return res.json(users)
  })
})

// Create User
app.post('/api/users', (req, res) => {
  // console.log("Server > POST '/users' > user ", req.body)
  // delete req.body._id
  console.log(req.body);
  User.create(req.body, (err, user) => {
    if (err) {res.send({
        success: false, message: '创建失败'
      })}else {
      res.send({
        success: true, message: '创建成功'
      })
    }
  })
})
// Destroy User
app.post('/api/delete/users', (req, res, next) => {
  // console.log("Server > DELETE '/users/:id' > id ", req.params.id)
  User.remove({ _id: req.body.id }, (err, rawData) => {
    if (err) {return res.json(err)}else {return res.json(true)}
  })
})
app.put('/api/users', (req, res, next) => {
  //   console.log("Server > PUT '/users/:id' > id ", req.params.id)
  //   console.log("Server > PUT '/users/:id' > user ", req.body)
  User.update({ _id: req.body._id }, {$set: {first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email}}, (err, rawData) => {
    if (err) {return res.json(err)} else {return res.json(true)}
  })
})

// Server Listening @ 1337
app.listen(1337, () => console.log('Server running at 1337'))
