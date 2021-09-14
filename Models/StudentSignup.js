const mongoose = require('mongoose');

const StudentSignupSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        
    },

    name1:{
        type: String,
        required: true,
        
    },

    birthday:{
        type: Date,
        required: true,
        
    },

    gender:{
        type: String,
        required: true,
        
    },

    nic:{
        type: String,
        required: true,
        
    },

    email:{
        type: String,
        required: true,
        
    },
    number:{
        type: Number,
        required: true,
        maxLength: 10
    },


   
    inputpw:{
        type: String,
        required: true,
        
    },

        
});

const StudentSignup = mongoose.model('StudentSignup', StudentSignupSchema);
module.exports = StudentSignup;