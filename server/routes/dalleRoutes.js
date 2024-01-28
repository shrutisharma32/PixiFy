//  This will be used to generate the data(Image) from API
import express from 'express';
import * as dotenv from 'dotenv'
import OpenAI from 'openai';

dotenv.config();
// making sure our env var are getting populated 

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });

router.route('/').get((req, res) => {
    res.send('Hello from DALL-E');
})

//   A route thats going to make a call to the openAI dall-e API and based on our prompt its going to return an AI generated image 
router.route('/').post(async (req, res) => {
    try {

        const { prompt } = req.body;
        // That frontend prompt 

        // for generating image (n:1 maening 1 image)
        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });
        // console.log(aiResponse);
        const image = aiResponse.data[0].b64_json;
        // if (aiResponse.data && aiResponse.data.data && aiResponse.data.data.length > 0) {
        //     var image = aiResponse.data.data[0].b64_json;
        //     // Use the image data as needed
        // } else {
        //     console.error("Error: No image data returned from the API.");
        // }

        res.status(200).json({ photo: image });

    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message)
    }
})

  export default router;


