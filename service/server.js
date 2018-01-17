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
// mongodb://mbdbk:nopass@ds249737.mlab.com:49737/kxdb
mongoose.connect('mongodb://123.57.54.112:27017', {useMongoClient: true}, function (err, db) {
  if(!err) {
    User.findOne({first_name: 'admin'}, (err, user) => {
      if(!err && !user) {
        User.create({first_name: 'admin', last_name: 'admin', password: 'admin', email: 'admin@123.com'}, (err, user) => {
          if(!err) {
            console.log('成功创建了admin用户');
          }
        })
      }
      if(!err) {
        console.log('连接数据库成功');
      }
    })
  }
})

app.get('/api/users',passport.authenticate('bearer', { session: false }), (req, res, next) => {
  User.find({}, (err, users) => {
    return res.json(users)
  })
})

// Get User
// app.get('/api/users', passport.authenticate('bearer', { session: false }), (req, res, next) => {
//   User.findOne({_id: req.body.id}, (err, users) => {
//     return res.json(users)
//   })
// })

// Create User
app.post('/api/users',passport.authenticate('bearer', { session: false }), (req, res) => {
  User.findOne({first_name: req.body.first_name}, (err, user) => {
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
            expiresIn: 5000 // token到期时间5000秒，过期之后执行数据操作会返回到登录页面
          })
          user.token = token
          user.save(function(err) {
            if (err) {
              res.send(err);
            }
          });
          res.json({
            success: true,
            massage: '验证通过',
            token: 'Bearer '+token,
            name: user.first_name
          })
        }else {
          res.send({success: false, message: '认证失败，密码错误'})
        }
      })
    }
  })
});

// 登出
app.post('/api/logout',(req, rex) => {
  User.findOne({first_name: req.body.userName}), (err, user) => {
    if(user && user.token) {
      user.token = null;
    }
  }
})

// Destroy User
app.post('/api/delete/users', passport.authenticate('bearer', { session: false }) ,(req, res, next) => {
  User.remove({ _id: req.body.id }, (err, rawData) => {
    if (err) {return res.json(err)}else {return res.json(true)}
  })
})

app.put('/api/users', passport.authenticate('bearer', { session: false }), (req, res, next) => {
    User.findOne({_id: req.body._id},(err, user) => {
      if(user) {
        if(user.first_name != req.body.first_name && user.token) {
          user.token = null;
        }
        user.first_name = req.body.first_name,
        user.last_name = req.body.last_name,
        user.email = req.body.email,
        user.save(function(err){
          if(err) {
            res.send(err);
          }
          res.send({success: true});
        })
      }
    }
)
})

// Server Listening @ 1337
app.listen(1337, () => console.log('Server running at 1337'))
