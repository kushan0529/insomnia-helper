const Journal = require('../models/Journal');
const { encrypt, decrypt } = require('../utils/encryption');

exports.getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user._id }).sort({ createdAt: -1 });
    const decryptedJournals = journals.map(j => ({
      ...j._doc,
      content: decrypt(j.content)
    }));
    res.json(decryptedJournals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createJournal = async (req, res) => {
  try {
    const { title, content, mood } = req.body;
    const encryptedContent = encrypt(content);
    const journal = new Journal({
      user: req.user._id,
      title,
      content: encryptedContent,
      mood
    });
    await journal.save();
    res.status(201).json({ ...journal._doc, content }); // Return decrypted for immediate UI update
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    res.json({ message: 'Journal deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateJournal = async (req, res) => {
  try {
    const { title, content, mood } = req.body;
    const encryptedContent = content ? encrypt(content) : undefined;
    
    const journal = await Journal.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, content: encryptedContent, mood },
      { new: true }
    );
    
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    res.json({ ...journal._doc, content });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
