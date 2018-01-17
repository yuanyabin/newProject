const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// 定义一个uer数据库模型
const UserSchema = new Schema({
    first_name: { type: String, unique:true, //不可重复
    require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    password: {type: String, require: true},
    token: {type: String}
})

// 添加用户保存时中间件对password进行bcrypt加密
UserSchema.pre('save', function(next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if(err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) {
                    return next(err);
                }
                user.password = hash;
                next();
            })
        })
    }else {
        return next();
    }
})

// 校验用户输入密码是否正确
UserSchema.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema);
