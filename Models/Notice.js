const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    date:{
        type: Date,
        default: Date.now
    },
    notice:{
        type: String,
        required: true,
        maxlength:250
    },

});
const Notice = mongoose.model('Notice', noticeSchema);
module.exports = Notice;