const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const cloudinary = require('../utils/cloudinary'); // ✅ Make sure path is correct

router.put('/update', auth, async (req, res) => {
  try {
    const { name, email, profileImage } = req.body;
    let uploadedImage = req.user.profileImage;

    // ✅ Upload image if it's new
    if (profileImage && profileImage.startsWith('data:image/')) {
      const result = await cloudinary.uploader.upload(profileImage, {
        folder: 'event-profiles'
      });
      uploadedImage = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, profileImage: uploadedImage },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ msg: 'Update failed', error: err.message });
  }
});

module.exports = router;
