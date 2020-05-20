const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
    nombre : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    hashed_password : {
        type : String,
        required : true
    },
    salt : String,
    created : {
        type : Date,
        default : Date.now        
    }
});

userSchema.virtual('password')
.set(function(password){
    
    this._password = password;
    
    this.salt = uuidv4();
    
    this.hashed_password = this.encryptPassword(password);
})
.get(function(){
    return this._password; 
});

//methods
userSchema.methods = {

    authenticate : function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password){
        if(!password) return "";

        try{
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        }
        catch(err){
            return "";
        }
    }
}

userSchema.pre("remove", function(next) {
    Post.remove({ postedBy: this._id }).exec();
    next();
});

module.exports = mongoose.model("User", userSchema);