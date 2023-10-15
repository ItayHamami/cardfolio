const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Favorite = require("../models/Favorite");
const _ = require("lodash")

//Get favorites
router.get("/:_id", auth, async (req, res) => {
    try {
        const favorites = await Favorite.findOne({ userId: req.params._id });
        if (!favorites) return res.status(204).send(["No favorite Business cards was selected..."]);
        res.status(200).send(favorites);
    } catch (error) {
        res.status(400).send(error);
    }
})

//Add/Remove favorite cards
router.post("/", auth, async (req, res) => {

    try {
        // 2. find user favorites
        let favorites = await Favorite.findOne({userId: req.payload._id});

        if (!favorites)
            return res.status(404).send("Sorry! something went wrong. try again later!");

        // 3. check if card is already in favorites => if true, remove it.
        let inFavorites = favorites.posts.find((fav) => fav._id == req.body._id);


        if (inFavorites) {
            let indexToDelete = favorites.posts.findIndex((fav) => fav._id == req.body._id)
            favorites.posts.splice(indexToDelete, 1);
            favorites.markModified("favorites");
        } else {
            favorites.posts.push(req.body);
        }

        // 4. add card to favorites array
        await favorites.save();

        // 5 . return a response
        res.status(201).send("The post was added to favorites.");
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
    const userId = req.params.id;

      // Find and delete the favorite list by userId
    const deletedFavorite = await Favorite.findOneAndDelete({ userId });

    if (!deletedFavorite) {
        return res.status(404).json({ message: "Favorite list not found" });
    }
    return res.status(200).json({ message: "Favorite list deleted successfully" });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    }
  });

module.exports = router;