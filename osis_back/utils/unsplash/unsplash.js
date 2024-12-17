import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Function to get images from Unsplash
export const getUnsplashImages = async (query, perPage = 4) => {
  const url = `https://api.unsplash.com/photos/random?query=${query}&count=${perPage}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    // Log the image URLs
    const imageUrls = response.data.map((image) => image.urls.full);
    console.log("Image URLs:", imageUrls);
    return imageUrls;
  } catch (error) {
    console.error(`Error fetching data from Unsplash ${query}`, error.message);
  }
};
