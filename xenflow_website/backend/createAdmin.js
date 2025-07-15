const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (q) => new Promise(res => rl.question(q, res));

(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB.');

  const username = await ask('Enter admin username: ');
  const password = await ask('Enter admin password: ');
  rl.close();

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hash, role: 'admin', admin: true });
  try {
    await user.save();
    console.log('Admin user created successfully!');
  } catch (err) {
    if (err.code === 11000) {
      console.log('Username already exists.');
    } else {
      console.error('Error creating admin user:', err);
    }
  }
  mongoose.disconnect();
})(); 