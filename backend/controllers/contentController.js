
const { db } = require('../firebase/config');

exports.getContent = async (req, res) => {
  try {
    const snapshot = await db.collection('home').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};
