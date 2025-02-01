const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
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