// used for creating the posts and retrieving the posts 

// to actually upload the generated images and prompts and the whole post itself basically to our AI social media platform, that basically makes our website full stack as we are able to store the posts in the home page 
import express from 'express';
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
// cloudinary is going to host our images for us so we can retrieve them later on after we submit them inorder to make our app so much faster.
// As we scale, we have to provide storage for all those images

import Post from '../mongodb/models/post.js'

dotenv.config();
// making sure our env var are getting populated 

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts 
router.route('/').get(async(req, res) => {

    try {
        const posts = await Post.find({});
        res.status(200).json({success: true, data: posts});
    } catch (error) {
        res.status(500).json({success: false, message: error});
    }
})

// Create a post 
router.route('/').post(async(req, res) => {
 
    try {
        // This is coming from front-end 
      const { name, prompt, photo } = req.body;

      // we are uploading it to cloudinary and then we get cloudinary optimised url.
    //   Before creating a new instance of a document, we are uploading the image to cloudinary that stores it and gives us back a photoUrl based on that instanceof, we then create a new post in the database by only sharing the url. 
      const photoUrl = await cloudinary.uploader.upload(photo);

      const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
      })

      res.status(201).json({success: true, data: newPost})

    } catch (error) {
        res.status(500).json({success: false, message: error})
    }
})

export default router;