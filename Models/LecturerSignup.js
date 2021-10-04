const mongoose = require('mongoose');

const LecturerSignupSchema = new mongoose.Schema({
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

        qualification:{
            type: String,
            required: true,
            
        },
       
        inputpw:{
            type: String,
            required: true,
            
        },
        role:{
            type: String,
            
        }
      
});

const LecturerSignup = mongoose.model('LecturerSignup', LecturerSignupSchema);
module.exports = LecturerSignup;