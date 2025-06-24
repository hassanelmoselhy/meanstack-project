const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  project_name: String,
  description: String,
  technologies: [String],
  link: String,
  image: String, 
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  user_address: String,
  user_phone: String,
  user_social: {
    linkedin: String,
    github: String,
    website: String,
    facebook: String
  },
  user_about: {
    bio: String,
    experience: String,
    education: [
      {
        degree: String,
        university: String,
        year: String
      }
    ],
    certifications: [String],
    languages: [String]
  },
  projects: [projectSchema],
  technologies: [String], 
  skills: [String],
  achievements: [String],
  hobbies: [String],
  availability: {
    isAvailable: Boolean,
    note: String
  },
  user_image: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
