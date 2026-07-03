require('dotenv').config();

const app = require('./app');
const db = require('./Models');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected ✅');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server ❌:', error.message);
    process.exit(1);
  }
}

start();
