const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  category: { type: String },
  level:    { type: Number }
});

module.exports = mongoose.model('Skill', SkillSchema);