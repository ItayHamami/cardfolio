const mongoose = require("mongoose");
/* old one
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
  },
  middleName: String,
  lastName: {
    type: String,
    required: true,
    minlength: 2,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
  },
  state: {
    type:String,
  required:false,
},
  city: {
    type: String,
    required: true,
    minlength: 2,
  },
  street: {
    type: String,
    required: true,
    minlength: 2,
  },
  houseNum: {
    type: Number,
    required: true,
    minlength: 1,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  }, 
  isBusiness:{
    type:Boolean, 
    required:true,
  }, 
  zip: { 
    type: String, 
    required:false,
  }
  
});
*/

const userSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
    },
    middleName: {
      type: String,
      required: false,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
    },
  },
  isBusiness: {
    type: Boolean,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  address: {
    state: {
      type: String,
      required: false,
      minlength: 2,
    },
    country: {
      type: String,
      required: true,
      minlength: 2,
    },
    city: {
      type: String,
      required: true,
      minlength: 2,
    },
    street: {
      type: String,
      required: true,
      minlength: 2,
    },
    houseNum: {
      type: Number,
      required: true,
    },
    zip: {
      type:String, 
      required:false,
      
    }
  },
});


const User = mongoose.model("User", userSchema);

module.exports = User;
