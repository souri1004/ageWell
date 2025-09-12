// server.js
import dotenv from 'dotenv';
import app from './index.js';

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
