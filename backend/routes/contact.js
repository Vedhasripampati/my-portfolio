const router = require('express').Router();
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  const message = new Message(req.body);
  await message.save();
  res.json({ success: true, message: 'Message sent! ✅' });
});

module.exports = router;