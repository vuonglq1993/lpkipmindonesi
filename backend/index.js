const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

// Example endpoint to get all news (collection: news)
app.get('/api/news', async (req, res) => {
  try {
    const snapshot = await db.collection('news').get();
    const news = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
