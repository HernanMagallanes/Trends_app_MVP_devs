const { postProfileImage } = require("../../controllers/image.controllers");

module.exports = async (req, res) => {
  try {
    const { id: userId, type: userType } = req.user;
    const { filename, path } = req.file;

    const uploadedImage = await postProfileImage(userId, userType, filename, path);

    if (uploadedImage?.error) {
      return res.status(400).json({ error: uploadedImage.error });
    }

    res.status(200).json(uploadedImage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error uploading image" });
  }
};
