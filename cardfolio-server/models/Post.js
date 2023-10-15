const mongoose = require("mongoose");

 
/*
const productSchema = new mongoose.Schema({

title: {
    type: String,
    required: true,
    minlength: 2,

},

subtitle: {
    type: Number,
    required: true,
    minlength:2,
},

description: {
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
website: {
    type: String,
    required: false,
},
imageUrl: {
    type: String,
    required: false,
},
imageAlt: {
    type: String,
    required: false,
},
country: {
    type: String,
    required: true,
    minlength:2,
},
state: {
    type: String,
    required: true,
    minlength:2,
},
city: {
    type: String,
    required: true,
    minlength:2,
},
street: {
    type: String,
    required: true,
    minlength:2,
},
houseNum: {
    type: Number,
    required: true,
    minlength:1,
},
zip: {
    type: String,
    required: false,
    minlength:3,
},
isFavorite: {
    type: Boolean,
    required: false,
},
});
*/


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  image:{
    imageURL: {
      type: String, 
      required: false,
    },
    imageAlt: {
      type:String, 
      required: false, 
      minlength: 2,
    },
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
      required:true,
      minlength:3,
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  biznumber: {
    type: Number,
    required: true,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

