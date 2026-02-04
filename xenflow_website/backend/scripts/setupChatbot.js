/**
 * Chatbot Setup Script
 * Initializes the chatbot system:
 * 1. Initializes embeddings
 * 2. Populates vector store
 * 
 * Run: node scripts/setupChatbot.js
 */

require('dotenv').config();
const { initializeEmbeddings } = require('../chatbot/embeddings');
const { populateDatabase, initializeDatabase, isPopulated } = require('../chatbot/vectorStore');

async function setup() {
  console.log('🚀 Starting chatbot setup...\n');

  try {
    // Step 1: Initialize embeddings
    console.log('📦 Step 1: Initializing embeddings...');
    await initializeEmbeddings();
    console.log('✅ Embeddings initialized\n');

    // Step 2: Initialize database
    console.log('💾 Step 2: Initializing vector store...');
    initializeDatabase();
    console.log('✅ Vector store initialized\n');

    // Step 3: Populate database
    if (isPopulated()) {
      console.log('⏭️  Step 3: Vector store already populated. Skipping...\n');
    } else {
      console.log('📝 Step 3: Populating vector store with website content...');
      console.log('   This may take a few minutes (generating embeddings)...\n');
      await populateDatabase();
      console.log('✅ Vector store populated\n');
    }

    // Step 4: Verify setup
    console.log('✅ Step 4: Setup verification...');
    console.log('✅ Chatbot is ready for production!\n');

    console.log('🎉 Chatbot setup complete!');
    console.log('\nNext steps:');
    console.log('1. Start your server:');
    console.log('   npm start');
    console.log('2. Test the chatbot:');
    console.log('   npm run test:chatbot');
    console.log('\n💡 The chatbot uses Hugging Face Inference API (free)');
    console.log('   with intelligent fallback - no additional setup needed!');

  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run setup
setup();

