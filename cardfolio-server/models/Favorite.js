const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
userId: {
    type: String,
    required: true,
},
posts: {
    type: Array,
    required: true,
}
})

const Favorite = mongoose.model("favorites", favoriteSchema);
module.exports = Favorite;