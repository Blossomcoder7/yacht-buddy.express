const fs = require('fs');
const path = require('path');
// const Image = require('../models/Image');

exports.uploadImages = async (req, res) => {
  try {
    const base64Images = req.body.images;

    const uploadedFiles = base64Images.map((base64, index) => {
      const buffer = Buffer.from(base64, 'base64');
      // Create a unique filename for each image (you may need to modify this logic)
      const filename = `image_${index + 1}_${Date.now()}_${res.originalName}`;

      const filePath = path.join(__dirname, '../uploads', filename);

      fs.writeFileSync(filePath, buffer);

      return {
        originalName:filename,
        filename: filename,
        path: filePath,
      };
    });

    const savedImages = await Image.insertMany(uploadedFiles);
    const objectIds = savedImages.map(image => image._id);
console.log(objectIds)
    // Additional image processing logic can go here

    res.status(200).json({
      message: 'Images uploaded successfully',
      files: savedImages,
      objectIds: objectIds, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.boatImage = async (req, res) => {
  try {
    const images = await Image.find();

    if (!images || images.length === 0) {
      return res.json({ message: 'Images not found' });
    }

    // Get an array of file paths
    const imagePaths = images.map(image => image.filename);
    console.log(imagePaths);

    // Set the appropriate content type in the response header
    res.setHeader('Content-Type', ['image/png', 'image/jpg', 'image/jpeg']);

    // Send the image binary data as the response
    res.status(200).json({ message: 'Images retrieved successfully', files: imagePaths });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
