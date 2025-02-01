const userModel = require('../models/user.model');
const blacklistModel = require('../models/blacklist.model');
const jwt = require('jsonwebtoken');

module.exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        const isBlacklisted = await blacklistModel.findOne({ token });
        if (!token) {
            return res.status(401).json({
                message: 'token not found',
            })
        }

        if (isBlacklisted) {
            return res.status(401).json({
                message: 'unauthorized',
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({
                message: 'unauthorized',
            })
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
};

module.exports.isSeller = (req, res, next) => {
    try{
        const user = req.user;
        if(user.role!=='seller'){
            return res.status(401).json({
                message: 'unauthorized',
            })
        }
        next();
    }
    catch(error){
        next(error);
    }
};