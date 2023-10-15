const express = require("express");
const auth = require("../middleware/auth");
const joi = require("joi");
const Post = require("../models/Post");
const router = express.Router();

const postSchema = joi.object({
  title: joi.string().required().min(2),
  subtitle: joi.string().required().min(2),
  description: joi.string().required().min(2),
  phone: joi.string().required().min(8),
  email: joi.string().required().email(),
  website: joi.string(),
  biznumber: joi.number(),
  userId: joi.string().required(),
  address: joi.object({
      country: joi.string().required().min(2),
      state: joi.string().required().min(2),
      city: joi.string().required().min(2),
      street: joi.string().required().min(2),
      houseNum: joi.number().required().min(1),
      zip: joi.string().required().min(3),
  }),
  image: joi.object({
      imageURL: joi.string(),
      imageAlt: joi.string().min(2),
  }),
});


//post new card 
router.post("/", auth, async (req, res) => {

    try {

      // 1. check if user is an admin
    if (!req.payload.isAdmin && !req.payload.isBusiness)
        return res.status(400).send("Access denied.");



      // 2. joi validation

    const { error } = postSchema.validate(req.body);

    if (error) return res.status(400).send(error);


      // 3. check if product already exists
    let post = await Post.findOne({

        title: req.body.title,
        email: req.body.email,

    });

    if (post) return res.status(400).send("Post already exists");


      // 4. add post  
      const userId = req.payload._id;
    post = new Post({...req.body , userId: userId});

    await post.save();

      // 5. return new post details

    res.status(201).send(post);
    } catch (error) {

    res.status(400).send(error);
    }

});
//get all cards
router.get("/", async (req, res) => {

    try {

    const posts = await Post.find();
    res.status(200).send(posts);

    } catch (error) {
    res.status(400).send(error);

    }
});

// Route to get cards of the authenticated user
router.get("/my-cards", auth, async (req, res) => {
  try {
    const userId = req.payload._id;

    // Find all cards that belong to the authenticated user
    const userCards = await Post.find({ userId });

    if (!userCards) {
      return res.status(404).send("No cards found for this user.");
    }

    res.status(200).send(userCards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


//get specific card
router.get("/:id", auth, async (req, res) => {

    try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("No such post");
    res.status(200).send(post);

    } catch (error) {
    res.status(400).send(error);
    }
});

//update card
router.put("/:id", auth, async (req, res) => {
  
  try {
    // 1. Get the user ID from the authenticated request
    const userId = req.payload._id;

    // 2. Find the post by ID
    const post = await Post.findById(req.params.id);
    console.log(post.userId, userId)
    // 3. Check if the post exists
    if (!post) {
      return res.status(404).send("Post not found");
    }

    // 4. Check if the user making the request is the owner of the post
    if (post.userId.toString() !== userId) {
      return res.status(403).send("Access denied. You do not have permission to edit this post");
    }

    // 5. Joi validation
    const { error } = postSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // 6. Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete card
router.delete("/:id", auth, async (req, res) => {

    try {

      // 1. check if user is an admin
    if (!req.payload.isAdmin)
        return res.status(400).send("Access denied. User is not an admin");

    let post = await Post.findByIdAndDelete({ _id: req.params.id });
    if (!post) return res.status(404).send("No such post");
    res.status(200).send("Product deleted successfully!");

    } catch (error) {

    res.status(400).send(error);

    }

});










module.exports = router;