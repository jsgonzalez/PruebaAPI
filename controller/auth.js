const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const _ = require('loadsh');
const User = require('../model/user.model');
const config = require('config');

const jwtConfig = config.get("jwt");

exports.signup = async (req, res) => {
    const userExists =  await User.findOne({email : req.body.email });
    if(userExists){
        return res.status(403).json({
            error : "Email esta registrado"
        })
    }

    const user = await new User(req.body);

    await user.save();

    res.status(200).json({
        user
    })
}

exports.signin = (req, res) => {
    // find the user based on email
    const { _id, name, email, password } = req.body;

    const userExists =  User.findOne({email}, (err, user) =>{
        if(err || !user){
            console.error("User with that email does no exist. Please singing.");
            return res.status(401).json({
                error : "User with that email does no exist. Please singing."
            });
        }

        if(!user.authenticate(password)){
            console.error("Email and password do not match. Please singing.");
            return res.status(401).json({
                error : "Email and password do not match. Please singing."
            });
        }

        const token = jwt.sign({ _id : user._id }, jwtConfig.JWT_SECRET)

       
        res.cookie("t", token, { expire : jwtConfig.expires})

        const {_id, name, email } = user;
        
        return res.status(200).json({token, user :  { _id , email, name } })

    });

};

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({
        message : "Signout success!"
    })
};

exports.requireSignin = expressJWT({
   
    secret : jwtConfig.JWT_SECRET,
    userProperty : "auth"
});