// Express
let express = require('express')
let app = express()
const User = require('./models/users')
const jwt = require('jsonwebtoken')
const config = require('./config')
const passport = require('passport')

require('./passport')(passport)

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  // res.sendfile(path.resolve('./public/dist/index.html'))
  next()
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

app.get('/api/users', (req, res, next) => {
  console.log("Server > GET '/users' ")
  User.find({}, (err, users) => {
    return res.json(users)
  })
})

// Get User
app.get('/api/users', (req, res, next) => {
  console.log("Server > GET '/users/:id' ")
  User.findOne({_id: req.body.id}, (err, users) => {
    return res.json(users)
  })
})

// Create User
app.post('/api/users', (req, res) => {
  User.findOne({first_name: req.body.first_name}, (err, user) => {
    console.log('aaa');
    if(err) {
      throw err;
    }
    if (user) {
      res.json({success: false, message: '此用户名已经存在'})
      return
    } if(!user){
      User.create(req.body, (err, user) => {
        if (err) {res.send({
            success: false, message: '创建失败'
          })}else {
          res.send({
            success: true, message: '创建成功'
          })
        }
      })
    } 
  })
}
)

// 登录
app.post('/api/login', (req, res) => {
  User.findOne({
    first_name: req.body.userName
  }, (err, user) => {
    if (err) {
      throw err
    }
    if (!user) {
      res.json({success: false, message: '认证失败，用户不存在'})
    }else if (user) {
      // 检查密码正确性
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          let token = jwt.sign({name: user.name}, config.secret, {
            expiresIn: 5000 // token到期时间
          })
          user.token = token
          User.update(user)
          res.json({
            success: true,
            massage: '验证通过',
            token: token,
            name: user.first_name
          })
        }else {
          res.send({success: false, message: '认证失败，密码错误'})
        }
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
