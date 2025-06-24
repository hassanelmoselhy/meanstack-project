const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const {
      user_name,
      user_address,
      user_phone,
      user_social,
      user_about,
      technologies,
      projects,
      skills,
      achievements,
      hobbies,
      availability
    } = req.body;

    const user_image = req.file ? req.file.filename : null;

    const user = new User({
      user_name,
      user_address,
      user_phone,
      user_social: JSON.parse(user_social),
      user_about: JSON.parse(user_about),
      technologies: JSON.parse(technologies),
      projects: JSON.parse(projects),
      skills: JSON.parse(skills),
      achievements: JSON.parse(achievements),
      hobbies: JSON.parse(hobbies),
      availability: JSON.parse(availability),
      user_image
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const {
      user_name,
      user_address,
      user_phone,
      user_social,
      user_about,
      technologies,
      projects,
      skills,
      achievements,
      hobbies,
      availability
    } = req.body;

    const updateData = {
      ...(user_name && { user_name }),
      ...(user_address && { user_address }),
      ...(user_phone && { user_phone }),
      ...(user_social && { user_social: JSON.parse(user_social) }),
      ...(user_about && { user_about: JSON.parse(user_about) }),
      ...(technologies && { technologies: JSON.parse(technologies) }),
      ...(projects && { projects: JSON.parse(projects) }),
      ...(skills && { skills: JSON.parse(skills) }),
      ...(achievements && { achievements: JSON.parse(achievements) }),
      ...(hobbies && { hobbies: JSON.parse(hobbies) }),
      ...(availability && { availability: JSON.parse(availability) })
    };

    if (req.file) {
      updateData.user_image = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 module.exports = {createUser , updateUser , getUserById }