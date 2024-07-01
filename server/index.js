const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Sync database
sequelize.sync().then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.error('Error syncing database:', err);
});

const userRoutes = require('./routes/userRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

app.use('/api/users', userRoutes);
app.use('/api/portfolios', portfolioRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

