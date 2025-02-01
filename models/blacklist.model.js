const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token : {
        type : String,
        required : true 
    }
});

blacklistSchema.index({ token : 1 }, { unique : true });

Blacklist = mongoose.model('blacklist', blacklistSchema);

module.exports = Blacklist;
