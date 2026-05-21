const router = require('express').Router();
const Skill = require('../models/Skill');

router.get('/', async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});

router.post('/', async (req, res) => {
  const skill = new Skill(req.body);
  await skill.save();
  res.json(skill);
});

module.exports = router;